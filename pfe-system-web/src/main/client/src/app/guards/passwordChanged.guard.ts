import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'app/main/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PasswordChangedGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    const isConnected = this.authenticationService.isValidToken();
    
    if(isConnected) return true;

    this.router.navigate(['/auth']);

    return false;

  }
}