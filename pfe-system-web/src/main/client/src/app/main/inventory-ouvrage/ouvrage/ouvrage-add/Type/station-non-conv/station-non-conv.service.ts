import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from 'config/api.config';
import {  Router } from '@angular/router';
import { ToolsService } from '@ayams/services/tools.service';

const OUVRAGE_API = API + '/ouvrage';

@Injectable({
    providedIn: 'root'
})

export class StationNonConvService {

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
                }, (error : any) => {
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
                    console.log(response);
                    if (response.code == "0") {
                        this.toolsService.showError('ADD.TOAST-ADD.existError');
                        reject(response);
                    }
                    else {
                        this.toolsService.showSuccess('ADD.TOAST-ADD.success');
                        resolve(response);
                    }
                },
                (error) => {
                    console.log(error);
                    this.toolsService.hideProgressBar();
                    this.toolsService.showError('ADD.TOAST-ADD.error');
                    reject(error);
                })
        });

    }
}