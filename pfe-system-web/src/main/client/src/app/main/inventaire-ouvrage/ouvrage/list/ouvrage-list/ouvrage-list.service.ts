import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { API } from 'config/api.config';

const OUVRAGE_API = API + '/ouvrage';
@Injectable({
  providedIn: 'root'
})
export class OuvrageListService implements Resolve<any> {

  constructor(
    private http: HttpClient,
  ) { }

  getAll(): Promise<String> {
    return new Promise((resolve, reject) => {
      this.http.get(OUVRAGE_API+ "/1")
        .subscribe((response: any) => {
          console.log(response)
          resolve(response);
        }, reject = (err)=> {console.log(err)});
    });
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {

      Promise.all([
        this.getAll()
      ]).then(
        (data) => {
          resolve(data);
          console.log(data)
        },
        (error) => {
          //this.router.navigate(['**']);
          resolve();
        }
      );
    });



  }
}
