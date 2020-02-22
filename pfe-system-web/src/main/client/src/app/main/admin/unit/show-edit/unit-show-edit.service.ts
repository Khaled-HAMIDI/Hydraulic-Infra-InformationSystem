import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from 'config/api.config';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Unit } from '../../../model/admin.model';
import { ToolsService } from '@ayams/services/tools.service';


const UNIT_API = API + '/units/deployedunit';

@Injectable({
    providedIn: 'root'
})

export class UnitShowEditService implements Resolve<any>{

    constructor(
        private http: HttpClient,
        private toolsService: ToolsService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ API function
    // -----------------------------------------------------------------------------------------------------

    getUsers(unitId) {
        return new Promise((resolve, reject) => {
            this.http.get(API + '/organisationalStructure/' + unitId + '/users')
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    get() {
        return new Promise((resolve, reject) => {
            this.http.get(UNIT_API)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    getExist() {
        return new Promise((resolve, reject) => {
            this.get().then(
                (unit: Unit) => {
                    this.getUsers(unit.id).then(
                        (users: any) => {
                            resolve([unit, users]);
                        },
                        (error) => {
                            reject;
                        })
                },
                (error) => {
                    reject;
                })
        });
    }

    save(unit): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.put(UNIT_API, unit)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });

    }


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

        return new Promise((resolve, reject) => {
            Promise.all([
                this.getExist()
            ]).then(
                (data) => {
                    resolve(data);
                },
                reject
            );
        });

    }


    saveUnit(unit) {
        return new Promise((resolve, reject) => {
            this.toolsService.showProgressBar();
            this.save(unit).then((responce) => {
                this.toolsService.hideProgressBar();

                this.toolsService.showSuccess('SHOW-EDIT.TOAST-EDIT.success');

                resolve(unit);
            },
                (error) => {
                    console.log(error);
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('SHOW-EDIT.TOAST-EDIT.error');
                })
                , reject
        });

    }

}
