import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from 'config/api.config';
import {  Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ToolsService } from '@ayams/services/tools.service';
import { Observable } from 'rxjs';
import { Chain, Ouvrage } from './model/chain.model';

const CHAIN_API = API + '/chain';
const OUVRAGES_API = API + '/ouvrages' ;
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

    getAllOuvrages(): Promise<Ouvrage[]> {
        return new Promise((resolve, reject) => {
            this.http.get(OUVRAGES_API)
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

    save(chain): Promise<any> {
        if (chain.id) return new Promise((resolve, reject) => {
            this.http.put(CHAIN_API + '/' + chain.id, chain)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
        return new Promise((resolve, reject) => {
            this.http.post(CHAIN_API, chain)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getExist(route),
                this.getAllOuvrages(),
            ]).then(
                (data) => {
                    resolve(data);

                },
                reject
            );
        });
    }


    saveChain(chain) {
        return new Promise((resolve, reject) => {
            this.toolsService.showProgressBar();
            this.save(chain).then((responce) => {
                this.toolsService.hideProgressBar();
                if (chain.id) {
                    let msg = this.toolsService.getTranslation('ADD-EDIT.TOAST-EDIT.success.before-var') 
                             + chain.name + this.toolsService.getTranslation('ADD-EDIT.TOAST-EDIT.success.after-var');
                    this.toolsService.showSuccess(msg);
                } else {
                    this.toolsService.showSuccess('ADD-EDIT.TOAST-ADD.success');
                }
                resolve(chain);
            },
                (error) => {
                    console.log(error);
                    this.toolsService.hideProgressBar();
                    if (chain.id){
                        let msg = this.toolsService.getTranslation('ADD-EDIT.TOAST-EDIT.error.before-var') 
                             + chain.name + this.toolsService.getTranslation('ADD-EDIT.TOAST-EDIT.error.after-var');
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