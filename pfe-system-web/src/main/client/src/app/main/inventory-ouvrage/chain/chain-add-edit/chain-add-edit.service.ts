import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from 'config/api.config';
import {  Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ToolsService } from '@ayams/services/tools.service';
import { Observable } from 'rxjs';
import { Chain } from './model/chain.model';

const CHAIN_API = API + '/chain';

@Injectable({
    providedIn: 'root'
})

export class ChainAddEditService {

    constructor(private router: Router,
                private http: HttpClient,
                private toolsService: ToolsService) {
    }

    get(id: number) {
        return new Promise((resolve, reject) => {
            this.http.get(CHAIN_API + '/' + id)
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
                    (chain: Chain) => {
                        resolve(chain);
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

    save(profil): Promise<any> {
        if (profil.id) return new Promise((resolve, reject) => {
            this.http.put(CHAIN_API + '/' + profil.id, profil)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });

        return new Promise((resolve, reject) => {
            this.http.post(CHAIN_API, profil)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getExist(route)
            ]).then(
                (data) => {
                    resolve(data);

                },
                reject
            );
        });
    }


    saveChain(profil) {
        return new Promise((resolve, reject) => {
            this.toolsService.showProgressBar();
            this.save(profil).then((responce) => {
                this.toolsService.hideProgressBar();
                if (profil.id) {
                    let msg = this.toolsService.getTranslation('ADD-EDIT.TOAST-EDIT.success.before-var') 
                             + profil.role + this.toolsService.getTranslation('ADD-EDIT.TOAST-EDIT.success.after-var');
                    this.toolsService.showSuccess(msg);
                } else {
                    this.toolsService.showSuccess('ADD-EDIT.TOAST-ADD.success');
                }
                resolve(profil);
            },
                (error) => {
                    console.log(error);
                    this.toolsService.hideProgressBar();
                    if (profil.id){
                        let msg = this.toolsService.getTranslation('ADD-EDIT.TOAST-EDIT.error.before-var') 
                             + profil.role + this.toolsService.getTranslation('ADD-EDIT.TOAST-EDIT.error.after-var');
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