import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from 'config/api.config';
import {  Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';


const CHAINS_API = API + '/chain';

@Injectable({
    providedIn: 'root'
})

export class ChainShowService implements Resolve<any> {


    constructor(private router: Router,
                private http: HttpClient) {

    }
    // @ API function

    get(id: number) {
        return new Promise((resolve, reject) => {
            this.http.get(CHAINS_API + '/' + id)
                .subscribe((response: any) => {
                    console.log(response);
                    resolve(response);
                }, (error) =>{
                    reject(error);
                });
        });
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

        return new Promise((resolve, reject) => {

            Promise.all([
                this.get(route.params.id)
            ]).then(
                (data) => {
                    resolve(data);
                },
                (error) => {
                    console.log(error);
                    this.router.navigate(['**']);
                    resolve();
                }
            );
        });


    }

}
