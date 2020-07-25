import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from 'config/api.config';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ToolsService } from '@ayams/services/tools.service';
import { Observable } from 'rxjs';
import {Ouvrage} from "../../chain/chain-add-edit/model/chain.model";

const INVENTORY_API = API + '/inventory';
const USERS_API = API + '/users/inventory';
const OUVRAGES_API = API + '/ouvrages' ;

@Injectable({
    providedIn: 'root'
})

export class InventoryAddService implements Resolve<any>{

    constructor(private router: Router,
        private http: HttpClient,
        private toolsService: ToolsService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ API function
    // -----------------------------------------------------------------------------------------------------


    getUsers() {
        return new Promise((resolve, reject) => {
            this.http.get(USERS_API)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });

    }

    getAllOuvrages(): Promise<Ouvrage[]> {
        return new Promise((resolve, reject) => {
            this.http.get(OUVRAGES_API)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    getCurrentInventory(){
        return new Promise((resolve, reject) => {
            this.http.get(API + '/inventory/current')
                .subscribe((response: any) => {
                    resolve(response);
                }, reject = (err) => { console.log(err) });
        });
    }

    getDate() {
        return new Promise((resolve, reject) => {
            this.http.get(API + '/date')
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    getDeployedUnit(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(API + '/units/deployedunit')
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    save(inventory): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post(INVENTORY_API, inventory)
                .subscribe((response: any) => {
                    resolve(response);
                }, (error: any) => {
                    console.log(error);
                    reject(error);
                });
        });

    }


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getUsers(),
                this.getAllOuvrages(),
                this.getCurrentInventory(),
                this.getDate(),
                this.getDeployedUnit()
            ]).then(
                (data) => {
                    resolve(data);

                },
                reject
            );
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