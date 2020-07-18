import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from 'config/api.config';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { ToolsService } from '@ayams/services/tools.service';
import { Observable } from 'rxjs';
import { Site } from './model/site.model';
import { AuthenticationService } from 'app/main/authentication/authentication.service';

const SITE_API = API + '/site';
@Injectable({
    providedIn: 'root'
})

export class SiteAddEditService implements Resolve<any> {
    code: string;
    constructor(private router: Router,
        private http: HttpClient,
        private toolsService: ToolsService,
        private authenticationService: AuthenticationService) {
    }

    get(id: string) {
        return new Promise((resolve, reject) => {
            this.http.get(SITE_API + '/' + id)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
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

    getExist(route) {
        return new Promise((resolve, reject) => {
            if (route.data.action === 'add') {
                resolve(false);
            }
            else if (route.data.action === "edit") {
                this.code = route.params.id
                this.get(route.params.id).then(
                    (site: Site) => {
                        resolve(site);
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

    save(site): Promise<any> {
        console.log(site);
        if (site.id) return new Promise((resolve, reject) => {
            this.http.put(SITE_API +'/'+site.id, site)
                .subscribe((response: any) => {
                    this.code = site.code;
                    resolve(response);
                }, reject);
        });
        delete site.id;

        return new Promise((resolve, reject) => {
            this.http.post(SITE_API, site)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        console.log(this.authenticationService.getRoles())
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getExist(route),
                this.getDate()
            ]).then(
                (data) => {
                    resolve(data);
                    this.code = route.params.code;
                },
                reject
            );
        });
    }


    saveSite(site) {
        return new Promise((resolve, reject) => {
            this.toolsService.showProgressBar();
            this.save(site).then((responce) => {
                this.toolsService.hideProgressBar();
                if (site.id) {
                    let msg = this.toolsService.getTranslation('ADD-EDIT.TOAST-EDIT.success.before-var')
                        + site.name + this.toolsService.getTranslation('ADD-EDIT.TOAST-EDIT.success.after-var');
                    this.toolsService.showSuccess(msg);
                } else {
                    this.toolsService.showSuccess('ADD-EDIT.TOAST-ADD.success');
                }
                resolve(site);
            },
                (error) => {
                    console.log(error);
                    this.toolsService.hideProgressBar();
                    if (site.id) {
                        let msg = this.toolsService.getTranslation('ADD-EDIT.TOAST-EDIT.error.before-var')
                            + site.name + this.toolsService.getTranslation('ADD-EDIT.TOAST-EDIT.error.after-var');
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