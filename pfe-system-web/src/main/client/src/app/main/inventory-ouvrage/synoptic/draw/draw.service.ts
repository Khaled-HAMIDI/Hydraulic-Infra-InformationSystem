import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from 'config/api.config';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { ToolsService } from '@ayams/services/tools.service';
import { Observable } from 'rxjs';
const CHAINS_API = API + '/chain/synoptic';
const CHAIN_API = API + '/chain';
const OUVRAGES_API = API + '/ouvrages/synoptic'
@Injectable({
    providedIn: 'root'
})

export class DrawService implements Resolve<any> {
    constructor(private router: Router,
        private http: HttpClient,
        private toolsService: ToolsService) {
    }

    getChains(code) {
        return new Promise((resolve, reject) => {
            this.http.get(CHAINS_API + '/' + code)
                .subscribe((response: any) => {
                    resolve(response);
                }, (error) => {
                    reject(error);
                });
        });

    }
    getOuvrages(code) {
        return new Promise((resolve, reject) => {
            this.http.get(OUVRAGES_API+ '/' + code)
                .subscribe((response: any) => {
                    resolve(response);
                }, (error) => {
                    reject(error);
                });
        });
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

        return new Promise((resolve, reject) => {
            console.log(route.params.code);
            Promise.all([
                this.getChains(route.params.code),
                this.getOuvrages(route.params.code)
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
