import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from 'config/api.config';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ToolsService } from '@ayams/services/tools.service';
import { Observable } from 'rxjs';

const OUVRAGE_API = API + '/ouvrage';

@Injectable({
    providedIn: 'root'
})

export class ReservoirService implements Resolve<any>{

    constructor(private router: Router,
        private http: HttpClient,
        private toolsService: ToolsService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ API function
    // -----------------------------------------------------------------------------------------------------


    save(ouvrage): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post(OUVRAGE_API, ouvrage)
                .subscribe((response: any) => {
                    resolve(response);
                }, (error: any) => {
                    console.log(error);
                    reject(error);
                });
        });

    }



    saveOuvrage(ouvrage) {
        return new Promise((resolve, reject) => {
            this.toolsService.showProgressBar();
            this.save(ouvrage).then((response) => {
                this.toolsService.hideProgressBar();
                this.toolsService.showSuccess('ADD.TOAST-ADD.success');
                resolve(response);
            },
                (error) => {
                    this.toolsService.hideProgressBar();
                    this.toolsService.showApiError(error.error.apierror.message);
                    reject(error);
                })
        });

    }

    getCommunes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(API + '/deployedunit/communes')
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    getStates(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(API + '/enum/state')
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    getTankRoles(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(API + '/enum/tankRole')
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    getTankTypes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(API + '/enum/tankType')
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    getForms(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(API + '/enum/forms')
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getCommunes(),
                this.getStates(),
                this.getTankRoles(),
                this.getTankTypes(),
                this.getForms(),

            ]).then(
                (data) => {
                    resolve(data);
                },
                reject
            );
        });

    }
}