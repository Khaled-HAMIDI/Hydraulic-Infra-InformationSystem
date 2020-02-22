import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../services/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AllAuthorizationGuard implements CanActivate {

  constructor(
    private authorizationService: AuthorizationService,
    private router: Router
  ){}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    let authorizationsSearched = next.data.authorizations;

    if(this.authorizationService.allPermitted(authorizationsSearched)) return true;
    
    this.router.navigate(['/home']);
    return false;
  }
}
