import { Component, OnInit, OnDestroy } from '@angular/core';
import { Table } from './Table'
import { Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';
import { ToolsService } from '@ayams/services/tools.service';
import { takeUntil } from 'rxjs/operators';
import {CompletedInventoriesService} from "../completed-inventories/completed-inventories.service";
import {CompletedInventoryService} from "./completed-inventory.service";
import {MatTableDataSource} from "@angular/material/table";
const COLUMN_NAMES: string[] = [
    'componentType',
    'state',
    'gap',
    'observation'
];

@Component({
  selector: 'app-completed-inventory',
  templateUrl: './completed-inventory.component.html',
  styleUrls: ['./completed-inventory.component.scss'],
    animations: fuseAnimations
})
export class CompletedInventoryComponent extends Table implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any>;
    btnExport: boolean;
    emptyList: boolean;
    dates =[];
    ouvrages = [];
    components = [];
    filtredComponents =[];
    ouvrageData =[];
    inventoryCode :string;

    constructor(
        private completedInventoryService: CompletedInventoryService,
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
                this.inventoryCode = this.route.snapshot.params['codeInventory'];
                this.dates = response.data[1];
                this.btnExport = response.data[0].length;
                this.emptyList = response.data[0].length == 0;
                this.ouvrages = response.data[0];
                this.components = response.data[2];

                for (let i in this.ouvrages){
                    this.ouvrageData.push({
                        ouvrage :this.ouvrages[i],
                        finishDate :this.dates[i],
                    })
                }

                this.initTable(this.components);
            },
            (error) => {
                console.log(error);
            }
        );
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public function
    // -----------------------------------------------------------------------------------------------------



    updateTable(ouvrage) {

        this.filtredComponents =this.components.filter(component => component.ouvrageCode === ouvrage.ouvrage.code);
        this.dataSource.data = this.filtredComponents;
        this.checkPage();
    }

    export() {
        this.completedInventoryService.exportDataXLS(["id"]);
    }


    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}
