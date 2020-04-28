import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from 'config/api.config';
import {  Router } from '@angular/router';


const OUVRAGES_API = API + '/ouvrage';
const t =API + '/ouvrage/test/composants/equipementHydroMeca'

@Injectable({
    providedIn: 'root'
})

export class OuvrageShowService {


    constructor(private router: Router,
                private http: HttpClient) {

    }
    // @ API function

    get(id: number) {

        this.http.get(t)
            .subscribe((response: any) => {
                console.log(response);
            }, (error) =>{
                console.log(error);
            });

        return new Promise((resolve, reject) => {
            this.http.get(OUVRAGES_API + '/show/' + id)
                .subscribe((response: any) => {
                    resolve(response);
                }, (error) =>{
                    reject(error);
                });
        });
    }


}
