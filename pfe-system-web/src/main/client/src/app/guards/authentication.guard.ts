import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../main/authentication/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private router:Router
  ){}


  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean 
  { 
    console.log();
    const isValidToken = this.authenticationService.isValidToken();
    const isPasswordChanged = this.authenticationService.isPasswordChanged();

    
    if(isValidToken && isPasswordChanged) return true;

    if(!isValidToken) {
        this.router.navigate(['/auth/login']);
     return false;
    }

    if(!isPasswordChanged) {
      this.router.navigate(['/auth/change-password']);
     return false;
    }
  }
}
