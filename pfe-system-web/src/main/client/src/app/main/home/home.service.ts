import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from 'config/api.config';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { ToolsService } from '@ayams/services/tools.service';
import { Observable } from 'rxjs';
import { AnalyticsDashboardDb } from './dashboard';
import includes from 'lodash/includes';
import { AuthenticationService } from '../authentication/authentication.service';

const OUVRAGE_API = API + '/ouvrage';
const READING_API = API + '/reading';
@Injectable({
    providedIn: 'root'
})

export class HomeService implements Resolve<any> {
    code: string;
    widgets
    constructor(private router: Router,
        private http: HttpClient,
        private toolsService: ToolsService,
        private authenticationService: AuthenticationService) {
    }

    getWidgets(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.http.get(OUVRAGE_API+'/nb')
                .subscribe((response: any) => {
                    resolve(response);
                    this.widgets = AnalyticsDashboardDb.widgets;
                }, reject);
        });
    } 
    getReading(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.http.get(READING_API+'/nb')
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
    getAvailability(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.http.get(API+'/exploitation/avail')
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    } 
    getAvailabilityDays(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.http.get(API+'/exploitation/availdays')
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    } 
    getSNCUse(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.http.get(API+'/exploitation/sncuse')
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    } 
    getTypes(){
        return new Promise((resolve, reject) => {
          this.http.get(OUVRAGE_API+"/type")
            .subscribe((response: any) => {
              resolve(response);
            }, reject = (err) => { console.log(err) });
        });
      }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        const userRoles = this.authenticationService.getRoles();

        if (includes(userRoles, "operateur"))
            this.router.navigate(['exploitation/reading']);
        else if (includes(userRoles, "RH"))
            this.router.navigate(['exploitation/reading']);

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getWidgets(),
                this.getTypes(),
                this.getReading(),
                this.getAvailability(),
                this.getAvailabilityDays(),
                this.getSNCUse()
            ]).then(
                (data) => {
                    resolve(data);
                },
                reject
            );
        });
    }


}