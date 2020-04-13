import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from 'config/api.config';
import {  Router } from '@angular/router';
import { ToolsService } from '@ayams/services/tools.service';

const INVENTORY_API = API + '/inventory';

@Injectable({
    providedIn: 'root'
})

export class InventoryAddService {

    constructor(private router: Router,
                private http: HttpClient,
                private toolsService: ToolsService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ API function
    // -----------------------------------------------------------------------------------------------------


    save(inventory): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post(INVENTORY_API, inventory)
                .subscribe((response: any) => {
                    resolve(response);
                }, (error : any) => {
                    console.log(error);
                    reject(error);
                });
        });

    }



    saveInventory(inventory) {
        return new Promise((resolve, reject) => {
            this.toolsService.showProgressBar();
            this.save(inventory).then((response) => {

                    this.toolsService.hideProgressBar();
                    this.toolsService.showSuccess('ADD.TOAST-ADD.success');
                    resolve(response);
                },
                (error) => {
                    console.log(error);
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('ADD.TOAST-ADD.error');
                    reject(error);
                })
        });

    }
}