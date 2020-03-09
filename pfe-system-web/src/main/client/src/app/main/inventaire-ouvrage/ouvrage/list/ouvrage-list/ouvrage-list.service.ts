import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OuvrageListService implements Resolve<any> {

  constructor() { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
      return [{
        type : "Station de Traitements",
        ouvrageCode :'19ST1',
        unite : 'Setif',
        commune:'Setif',
        debit : 100,
        enabled: true
      }];



}
}
