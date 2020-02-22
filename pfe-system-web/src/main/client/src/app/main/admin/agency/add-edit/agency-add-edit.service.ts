import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from 'config/api.config';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import { Agency } from '../../../model/admin.model';
import { ToolsService } from '@ayams/services/tools.service';

const AGENCIES_API = API + '/agencies';
const CENTERS_API = API + '/centers';

@Injectable({
    providedIn: 'root'
})

export class AgencyAddEditService implements Resolve<any>{

    constructor(private router: Router,
        private http: HttpClient,
        private toolsService: ToolsService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ API function
    // -----------------------------------------------------------------------------------------------------

    getUsers(route) {
        if (route.data.action === "edit") {

            return new Promise((resolve, reject) => {
                this.http.get(API + '/organisationalStructure/' + route.params.id + '/users')
                    .subscribe((response: any) => {
                        resolve(response);
                    }, reject);
            });
        }
    }

    getCenters() {
        return new Promise((resolve, reject) => {
            this.http.get(CENTERS_API)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    get(id: string) {
        return new Promise((resolve, reject) => {
            this.http.get(AGENCIES_API + '/' + id)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    getExist(route) {
        return new Promise((resolve, reject) => {
            if (route.data.action === 'add') {
                resolve(false);
            }
            else if (route.data.action === "edit") {
                this.get(route.params.id).then(
                    (agency: Agency) => {
                        resolve(agency);
                    },
                    (error) => {
                        this.router.navigate(['**']);
                        resolve();
                    }

                )
            } else {
                this.router.navigate(['**']);
                resolve();
            }
        });
    }

    save(agency): Promise<any> {
        if (agency.id) return new Promise((resolve, reject) => {
            this.http.put(AGENCIES_API + '/' + agency.id, agency)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });

        return new Promise((resolve, reject) => {
            this.http.post(AGENCIES_API, agency)
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

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getExist(route),
                this.getCenters(),
                this.getUsers(route),
                this.getDeployedUnit()
            ]).then(
                (data) => {
                    resolve(data);

                },
                reject
            );
        });

    }

    saveAgency(agency) {
        return new Promise((resolve, reject) => {
            this.toolsService.showProgressBar();
            this.save(agency).then((responce) => {

                this.toolsService.hideProgressBar();
                if (agency.id) {
                    let msg = this.toolsService.getTranslation('ADD-EDIT.TOAST-EDIT.success.before-var')
                        + agency.code + this.toolsService.getTranslation('ADD-EDIT.TOAST-EDIT.success.after-var');
                    this.toolsService.showSuccess(msg);
                }
                else {
                    this.toolsService.showSuccess('ADD-EDIT.TOAST-ADD.success');
                }
                resolve(responce);
            },
                (error) => {
                    console.log(error);
                    this.toolsService.hideProgressBar();
                    if (agency.id) {
                        let msg = this.toolsService.getTranslation('ADD-EDIT.TOAST-EDIT.error.before-var')
                            + agency.code + this.toolsService.getTranslation('ADD-EDIT.TOAST-EDIT.error.after-var');
                        this.toolsService.showError(msg);
                    }
                    else {
                        this.toolsService.showError('ADD-EDIT.TOAST-ADD.error');
                    }
                })
                , reject
        });

    }
}