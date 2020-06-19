import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { API } from 'config/api.config';
import { ToolsService } from '@ayams/services/tools.service';
import * as XLSX from 'xlsx';
import {Inventory} from "./model/completedInventories.model";

const INVENTORY_API = API + '/inventory/';
@Injectable({
    providedIn: 'root'
})
export class CompletedInventoryService implements Resolve<any> {

    inventories: Inventory[];
    inventoriesByFilter: Inventory[];
    onInventoriesChanged: Subject<any>;

    constructor(
        private router: Router,
        private http: HttpClient,
        private toolsService: ToolsService
    ) {
        this.inventoriesByFilter = [];
        this.onInventoriesChanged = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ API function
    // -----------------------------------------------------------------------------------------------------

    getOuvrages(inventoryCode): Promise<Inventory[]> {
        return new Promise((resolve, reject) => {
            this.http.get(INVENTORY_API +inventoryCode +'/ouvrages')
                .subscribe((response: any) => {
                    resolve(response);
                    this.inventories = response;
                }, reject = (err) => { console.log(err) });
        });
    }

    getInventoryOuvragesDate(inventoryCode){
        return new Promise((resolve, reject) => {
            this.http.get(INVENTORY_API+ inventoryCode +'/ouvrages/dates')
                .subscribe((response: any) => {
                    this.inventories = response;
                    resolve(response);
                }, reject = (err) => { console.log(err) });
        });
    }

    getComponents(inventoryCode){
        return new Promise((resolve, reject) => {
            this.http.get(INVENTORY_API+ inventoryCode+'/composant')
                .subscribe((response: any) => {
                    resolve(response);
                }, reject = (err) => { console.log(err) });
        });
    }



    // -----------------------------------------------------------------------------------------------------
    // @ Setter function
    // -----------------------------------------------------------------------------------------------------
    setOuvragesByFilter(inventoriesByFilter: any[]) {
        this.inventoriesByFilter = inventoriesByFilter;
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getOuvrages(route.params['codeInventory']),
                this.getInventoryOuvragesDate(route.params['codeInventory']),
                this.getComponents(route.params['codeInventory'])
            ]).then(
                (data) => {
                    resolve(data);
                },
                (error) => {
                    resolve();
                }
            );
        });



    }
    exportDataXLS(properties) {
        var data;

        this.toolsService.showProgressBar();

        if (this.inventoriesByFilter.length)
            data = this.inventoriesByFilter;
        else
            data = this.inventories;

        //remove reference
        data = JSON.parse(JSON.stringify(data));

        this.removeProperties(data, properties);
        //this.replacePorperty(data);

        /* generate a worksheet */
        var ws = XLSX.utils.json_to_sheet(data);

        /* add to workbook */
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Inventaires");

        /* write workbook and force a download */
        XLSX.writeFile(wb, "Inventaires.xlsx");

        this.toolsService.hideProgressBar();
    }


    removeProperties(data, properties) {

        data.forEach(element => {
            for (var i = 0; i < properties.length; i++) {
                delete element[properties[i]];
            }
        });
    }

}
