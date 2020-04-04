import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from 'config/api.config';
import {  Router } from '@angular/router';


const OUVRAGES_API = API + '/ouvrage';

@Injectable({
    providedIn: 'root'
})

export class OuvrageShowService {


    constructor(private router: Router,
                private http: HttpClient) {

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


}
