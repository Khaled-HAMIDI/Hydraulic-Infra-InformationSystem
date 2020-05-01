import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from 'config/api.config';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ToolsService } from '@ayams/services/tools.service';
import { Observable } from 'rxjs';

const SITE_API = API + '/site';

@Injectable({
    providedIn: 'root'
})

export class OuvrageAddService implements Resolve<any>{
    constructor(private router: Router,
        private http: HttpClient,
        private toolsService: ToolsService) {
    }

    saveSite(site): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post(SITE_API, site)
                .subscribe((response: any) => {
                    resolve(response);
                }, (error: any) => {
                    console.log(error);
                    reject(error);
                });
        });

    }

    saveSiteOuv(site) {
        return new Promise((resolve, reject) => {
            this.toolsService.showProgressBar();
            this.saveSite(site).then((response) => {

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
    getSites(){
        return new Promise((resolve, reject) => {
            this.http.get(SITE_API)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getSites()
            ]).then(
                (data) => {
                    resolve(data);

                },
                reject
            );
        });

    }
}