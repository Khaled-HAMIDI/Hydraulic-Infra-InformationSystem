import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from 'config/api.config';
import {  Router } from '@angular/router';
import { ToolsService } from '@ayams/services/tools.service';


const OUVRAGES_API = API + '/chain';

@Injectable({
    providedIn: 'root'
})

export class ChainEditService {


    constructor(private router: Router,
                private http: HttpClient,
                private toolsService: ToolsService) {

    }
    // @ API function

    get(id: number) {
        return new Promise((resolve, reject) => {
            this.http.get(OUVRAGES_API + '/edit/' + id)
                .subscribe((response: any) => {
                    resolve(response);
                }, (error) =>{
                    reject(error);
                });
        });
    }




    save(chain,code): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.put(OUVRAGES_API + '/' + code, chain)
                .subscribe((response: any) => {
                    resolve(response);
                },(error) =>{
                    reject(error);
                } );
        });
    }





    saveChain(chain,code) {
        return new Promise((resolve, reject) => {
            this.toolsService.showProgressBar();
            this.save(chain,code).then((responce) => {
                    this.toolsService.hideProgressBar();
                    let msg = this.toolsService.getTranslation('EDIT.TOAST-EDIT.success.before-var')
                            + code +' ' + this.toolsService.getTranslation('EDIT.TOAST-EDIT.success.after-var');
                            this.toolsService.showSuccess(msg);

                    resolve(chain);
                },
                (error) => {
                    this.toolsService.hideProgressBar();

                    let msg = this.toolsService.getTranslation('EDIT.TOAST-EDIT.error.before-var')
                            + code +' ' + this.toolsService.getTranslation('EDIT.TOAST-EDIT.error.after-var');
                            this.toolsService.showError(msg);
                })
                , reject
        });

    }

}
