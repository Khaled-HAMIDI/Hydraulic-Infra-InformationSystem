import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from 'config/api.config';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import { Center } from '../../../model/admin.model';
import { ToolsService } from '@ayams/services/tools.service';

const CENTER_API = API + '/centers';

@Injectable({
    providedIn: 'root'
})

export class CenterAddEditService implements Resolve<any>{

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
 
    get(id: number) {
        return new Promise((resolve, reject) => {
            this.http.get(CENTER_API + '/' + id)
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
                    (center: Center) => {
                        resolve(center);
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


    save(center): Promise<any> {
        if (center.id) return new Promise((resolve, reject) => {
            this.http.put(CENTER_API + '/' + center.id, center)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });

        return new Promise((resolve, reject) => {
            this.http.post(CENTER_API, center)
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


    saveCenter(center) {
        return new Promise((resolve, reject) => {
            this.toolsService.showProgressBar();
            this.save(center).then((responce) => {
                this.toolsService.hideProgressBar();
                if (center.id){
                    let msg = this.toolsService.getTranslation('ADD-EDIT.TOAST-EDIT.success.before-var') 
                             + center.code + this.toolsService.getTranslation('ADD-EDIT.TOAST-EDIT.success.after-var');
                    this.toolsService.showSuccess(msg);
                }
                else{
                    this.toolsService.showSuccess('ADD-EDIT.TOAST-ADD.success');
                }
                resolve(responce);
            },
                (error) => {
                    console.log(error);
                    this.toolsService.hideProgressBar();
                    if (center.id){
                        let msg = this.toolsService.getTranslation('ADD-EDIT.TOAST-EDIT.error.before-var') 
                             + center.code + this.toolsService.getTranslation('ADD-EDIT.TOAST-EDIT.error.after-var');
                        this.toolsService.showError(msg);
                    }
                    else{
                        this.toolsService.showError('ADD-EDIT.TOAST-ADD.error');
                    }
                })
                , reject
        });


    }


}