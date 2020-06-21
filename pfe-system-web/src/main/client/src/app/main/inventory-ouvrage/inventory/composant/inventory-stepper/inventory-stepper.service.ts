import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute} from '@angular/router';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { API } from 'config/api.config';
import { ToolsService } from '@ayams/services/tools.service';
import {componentInventory} from "../model/componentInventory.model";

const INVENTORY_API = API + '/inventory/';
@Injectable({
    providedIn: 'root'
})
export class InventoryStepperService implements Resolve<any> {
    code:string
    constructor(
        private router: Router,
        private http: HttpClient,
        private route :ActivatedRoute,
        private toolsService: ToolsService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ API function
    // -----------------------------------------------------------------------------------------------------

    getComponents(codeInventory, codeOuvrage): Promise<componentInventory[]> {
        this.code = codeOuvrage;
        return new Promise((resolve, reject) => {
            this.http.get(INVENTORY_API + codeInventory + '/' +codeOuvrage + '/composant')
                .subscribe((response: any) => {
                    resolve(response);
                }, reject = (err) => { console.log(err) });
        });
    }

    saveInventoryComponent(component,codeInventory,codeOuvrage): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post(INVENTORY_API  +codeInventory +'/' + codeOuvrage + '/components', component)
                .subscribe((response: any) => {
                    resolve(response);
                }, (error: any) => {
                    console.log(error);
                    reject(error);
                });
        });

    }

    inventoryOuvrageValidate(codeInventory,codeOuvrage){
        return new Promise((resolve, reject) => {
            this.toolsService.showProgressBar();
            console.log('testt');
            this.http.get(API + '/inventory/update/' +codeInventory + '/' + codeOuvrage)
                .subscribe((response: any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showSuccess('ADD.TOAST-ADD.success');
                    resolve(response);
                }, (error: any) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showApiError(error.error.message);
                    reject(error);
                });
        });
    }


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getComponents(route.params['codeInventory'],route.params['codeOuvrage'])
            ]).then(
                (data) => {
                    resolve(data);
                },
                (error) => {
                    //this.router.navigate(['**']);
                    resolve();
                }
            );
        });

    }
}
