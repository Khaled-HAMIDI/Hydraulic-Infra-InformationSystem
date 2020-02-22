import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from 'config/api.config';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import { Role, Center, Agency, User } from '../../../model/admin.model';
import { ToolsService } from '@ayams/services/tools.service';


const USERS_API = API + '/users';
const CENTERS_API = API + '/centers';
const PROFILS_API = API + '/roles';

@Injectable({
    providedIn: 'root'
})

export class UserAddEditService implements Resolve<any>{


    constructor(private router: Router,
        private http: HttpClient,
        private toolsService: ToolsService) {

    }
    // @ API function

    get(id: number) {
        return new Promise((resolve, reject) => {
            this.http.get(USERS_API + '/' + id)
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
                    (user: User) => {
                        resolve(user);
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

    getRoles(): Promise<Role[]> {
        return new Promise((resolve, reject) => {
            this.http.get(PROFILS_API)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });

    }

    getCenters(): Promise<Center[]> {
        return new Promise((resolve, reject) => {
            this.http.get(CENTERS_API)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });

    }

    save(user): Promise<any> {
        if (user.id) return new Promise((resolve, reject) => {
            this.http.put(USERS_API + '/' + user.id, user)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });

        return new Promise((resolve, reject) => {
            this.http.post(USERS_API, user)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });

    }

    getAgenciesWithCenterId(centerId: string): Promise<Agency[]> {
        return new Promise((resolve, reject) => {
            this.http.get(CENTERS_API + '/' + centerId + '/agencies')
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
                this.getRoles()
            ]).then(
                (data) => {
                    resolve(data);

                },
                reject
            );
        });
    }


    saveUser(user) {
        return new Promise((resolve, reject) => {
            this.toolsService.showProgressBar();
            this.save(user).then((responce) => {
                this.toolsService.hideProgressBar();
                if (user.id) {
                    let msg = this.toolsService.getTranslation('ADD-EDIT.TOAST-EDIT.success.before-var') 
                             + user.lastName +' '+ user.firstName + this.toolsService.getTranslation('ADD-EDIT.TOAST-EDIT.success.after-var');
                    this.toolsService.showSuccess(msg);
                } else {
                    this.toolsService.showSuccess('ADD-EDIT.TOAST-ADD.success');
                }
                  resolve(user);
            },
                (error) => {
                    this.toolsService.hideProgressBar();
                    if (user.id){
                        let msg = this.toolsService.getTranslation('ADD-EDIT.TOAST-EDIT.error.before-var') 
                                + user.lastName +' '+ user.firstName + this.toolsService.getTranslation('ADD-EDIT.TOAST-EDIT.error.after-var');
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
