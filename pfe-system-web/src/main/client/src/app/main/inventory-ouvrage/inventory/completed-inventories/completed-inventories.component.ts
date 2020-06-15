import { Component, OnInit, OnDestroy } from '@angular/core';
import { Table } from './Table'
import { Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { CompletedInventoriesService } from './completed-inventories.service';
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';
import { ToolsService } from '@ayams/services/tools.service';
import { takeUntil } from 'rxjs/operators';
const COLUMN_NAMES: string[] = [
    'code',
    'startDate',
    'finishDate',
    'chief'
];

@Component({
  selector: 'app-completed-inventories',
  templateUrl: './completed-inventories.component.html',
  styleUrls: ['./completed-inventories.component.scss'],
    animations: fuseAnimations
})
export class CompletedInventoriesComponent extends Table implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any>;
    btnExport: boolean;
    emptyList: boolean;
    filtredInventories;
    searchTerm: string = '';
    cheifs = [];
    inventoryData = [];

    constructor(
        private completedInventoriesService: CompletedInventoriesService,
        private route: ActivatedRoute,
        private toolsService: ToolsService,
        public router: Router) {
        super(COLUMN_NAMES)
        this._unsubscribeAll = new Subject();
        this.toolsService.loadTranslations(french, arabic);
    }

    ngOnInit() {
        this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                console.log(response.data[0]);
                this.cheifs = response.data[1];
                this.btnExport = response.data[0].length;
                this.emptyList = response.data[0].length == 0;
                this.filtredInventories = response.data[0];

                for (let i in this.filtredInventories){
                    this.inventoryData.push({
                        data :this.filtredInventories[i],
                        cheif :this.cheifs[i],
                    })
                }

                this.initTable(this.inventoryData);
            },
            (error) => {
                console.log(error);
            }
        );


        this.completedInventoriesService.onInventoriesChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (inventories) => {
                this.dataSource.data = inventories;
                this.applyFilter(this.dataSource.filter);
                this.checkPage();
            }
        );
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public function
    // -----------------------------------------------------------------------------------------------------

    applyFilter(filterValue: string) {

        this.filter(filterValue);
        this.completedInventoriesService.setOuvragesByFilter(this.dataSource.filteredData);
        this.filtredInventories = this.dataSource.filteredData;
        this.btnExport = this.dataSource['_renderData'].value.length;
    }

    export() {
        this.completedInventoriesService.exportDataXLS(["id"]);
    }


    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}
