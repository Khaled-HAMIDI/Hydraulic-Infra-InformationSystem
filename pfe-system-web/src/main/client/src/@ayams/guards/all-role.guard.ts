import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RoleService } from '@ayams/services/role.service';

@Injectable({
  providedIn: 'root'
})
export class AllRoleGuard implements CanActivate {

  constructor(
    private roleService: RoleService,
    private router: Router
  ){}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    let authorizationsSearched = next.data.authorizations;

    if(this.roleService.allRole(authorizationsSearched)) return true;
    
    this.router.navigate(['/home']);
    return false;
  }
}
