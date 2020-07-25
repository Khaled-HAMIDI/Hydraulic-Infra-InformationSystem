import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from 'config/api.config';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { ToolsService } from '@ayams/services/tools.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ReportService implements Resolve<any> {
    constructor(private router: Router,
        private http: HttpClient,
        private toolsService: ToolsService) {
    }
    getTypes() {
        return new Promise((resolve, reject) => {
            this.http.get(API + "/enum/typeOuvrage")
                .subscribe((response: any) => {
                    resolve(response);
                }, reject = (err) => { console.log(err) });
        });
    }
    getWilayas() {
        return new Promise((resolve, reject) => {
            this.http.get(API + "/wilayas")
                .subscribe((response: any) => {
                    resolve(response);
                }, reject = (err) => { console.log(err) });
        });
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getTypes(),
                this.getWilayas()
            ]).then(
                (data) => {
                    resolve(data);

                },
                reject
            );
        });
    }
}