import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from 'config/api.config';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';

const PROFILS_API = API + '/roles';

@Injectable({
    providedIn: 'root'
})

export class ProfilShowService implements Resolve<any>{


    constructor(private router: Router, private http: HttpClient) {
    }

    // @ API function

    get(id: number) {
        return new Promise((resolve, reject) => {
            this.http.get(PROFILS_API + '/' + id)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }


    // @ Selection function

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

        return new Promise((resolve, reject) => {

            Promise.all([
                this.get(route.params.id)
            ]).then(
                (data) => {
                    resolve(data);
                },
                (error) => {
                    this.router.navigate(['**']);
                    resolve();
                }
            );
        });

    }

}
