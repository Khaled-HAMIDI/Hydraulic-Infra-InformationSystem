import { Component, OnInit, OnDestroy } from '@angular/core';
import { Table } from './Table'
import { Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthorizationService } from '@ayams/services/authorization.service';
import { CurrentInventoryService} from "./current-inventory.service";
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';
import { ToolsService } from '@ayams/services/tools.service';
import { takeUntil } from 'rxjs/operators';
import {Inventory} from "./model/currentInventory.model";
const COLUMN_NAMES: string[] = [
    'code',
    'name',
    'type',
    'status',
    'inventoryStart',
    'inventoryOuvrageDate'
    ];


@Component({
  selector: 'app-current-inventory',
  templateUrl: './current-inventory.component.html',
  styleUrls: ['./current-inventory.component.scss'],
    animations: fuseAnimations
})
export class CurrentInventoryComponent extends Table implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any>;
    emptyList: boolean;
    currentCategory;
    filtredOuvrages;
    searchTerm: string = '';
    types = [];
    status = [];
    dates = [];
    inventoryDate;
    inventoryData = [];
    inventory : Inventory;

    constructor(
        private currentInventoryService: CurrentInventoryService,
        private route: ActivatedRoute,
        private toolsService: ToolsService,
        public router: Router) {
        super(COLUMN_NAMES)
        this._unsubscribeAll = new Subject();
        this.toolsService.loadTranslations(french, arabic);
        this.currentCategory = 'all';
        this.filtredOuvrages = [];
        this.inventoryData = [];
    }

    ngOnInit() {
        this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                this.filtredOuvrages = response.data[0];
                this.emptyList = response.data[0].length == 0;
                this.types = response.data[1];
                this.status = response.data[2];
                this.dates =response.data[3];
                this.inventoryDate =response.data[4];
                this.inventory = response.data[5];

                for (let i in this.filtredOuvrages){
                    this.inventoryData.push({
                        ouvrage :this.filtredOuvrages[i],
                        status :this.status[i],
                        ouvrageDate:this.dates[i],
                        inventoryDate:this.inventoryDate
                    })
                }

                this.initTable(this.inventoryData);
            },
            (error) => {
                console.log(error);
            }
        );

        this.currentInventoryService.onOuvragesChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (ouvrages) => {
                this.dataSource.data = ouvrages;
                this.applyFilter(this.dataSource.filter);
                this.checkPage();
            }
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public function
    // -----------------------------------------------------------------------------------------------------
    filterOuvragesByType(): void {
        console.log(this.currentCategory);
        // Filter
        if (this.currentCategory === 'all') {
            this.filtredOuvrages = this.currentInventoryService.ouvrages;
            this.initTable(this.filtredOuvrages);
            this.currentInventoryService.setOuvragesByFilter(this.filtredOuvrages)
        }
        else {
            this.filtredOuvrages = this.currentInventoryService.ouvrages.filter((ouvrage) => {
                return ouvrage.type === this.currentCategory;
            });
            this.initTable(this.filtredOuvrages);
            this.currentInventoryService.setOuvragesByFilter(this.filtredOuvrages)

        }

        // Re-filter by search term
        this.applyFilter(this.searchTerm)
    }

    applyFilter(filterValue: string) {

        this.filter(filterValue);
        this.currentInventoryService.setOuvragesByFilter(this.dataSource.filteredData);
        this.filtredOuvrages = this.dataSource.filteredData;
    }

    InventoryValidate() {
        this.currentInventoryService.inventoryValidate()
            .then((response:any) => {
                    console.log(response);
                    this.router.navigate(['/patrimony/inventory/completed']);

                },
                (error) => {
                    console.log("No")
                });
    }

    heightDyn() {
        return document.getElementById('headerHeight').clientHeight + 'px';
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}
