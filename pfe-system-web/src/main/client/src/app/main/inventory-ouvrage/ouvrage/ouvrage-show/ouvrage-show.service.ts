import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from 'config/api.config';
import {  Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PrintReportsService } from '@ayams/services/print-reports.service';


const OUVRAGES_API = API + '/ouvrage/';

@Injectable({
    providedIn: 'root'
})

export class OuvrageShowService  implements Resolve<any> {


    constructor(private router: Router,
                private http: HttpClient,
                private printReportsService: PrintReportsService) {

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

      
    printFicheTechnique(code: string, type: string){
      this.printReportsService.printReport("print/OuvrageFicheTechnique", {code: code, type: type});
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {
    
          Promise.all([
            this.get(route.params.code)
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
