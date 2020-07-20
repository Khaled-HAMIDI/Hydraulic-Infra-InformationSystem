import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from 'config/api.config';
import {  Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ToolsService } from '@ayams/services/tools.service';
import { Observable } from 'rxjs';


const OUVRAGES_API = API + '/ouvrage/';

@Injectable({
    providedIn: 'root'
})

export class OuvrageEditService implements Resolve<any>{


    constructor(private router: Router,
                private http: HttpClient,
                private toolsService: ToolsService) {

    }
    // @ API function

    get(id: number) {
        return new Promise((resolve, reject) => {
            this.http.get(OUVRAGES_API + id)
                .subscribe((response: any) => {
                    resolve(response);
                }, (error) =>{
                    reject(error);
                });
        });
    }

    getStates(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(API + '/enum/state')
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }




    save(ouvrage,code): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.put(OUVRAGES_API + code, ouvrage)
                .subscribe((response: any) => {
                    resolve(response);
                },(error) =>{
                    console.log(error);
                } );
        });
    }





    saveOuvrage(ouvrage,code) {
        return new Promise((resolve, reject) => {
            this.toolsService.showProgressBar();
            this.save(ouvrage,code).then((responce) => {
                    this.toolsService.hideProgressBar();
                    let msg = this.toolsService.getTranslation('EDIT.TOAST-EDIT.success.before-var')
                            + code +' ' + this.toolsService.getTranslation('EDIT.TOAST-EDIT.success.after-var');
                            this.toolsService.showSuccess(msg);

                    resolve(ouvrage);
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


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {
    
          Promise.all([
              this.get(route.params.code),
              this.getStates()
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
