import { Injectable } from '@angular/core';
import { AuthenticationService } from 'app/main/authentication/authentication.service';
import indexOf from 'lodash/indexOf';
import some from 'lodash/some';
import every from 'lodash/every';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private authenticationService: AuthenticationService
  ) { }


  someRole(rolesNeeded: string[]) {
    return some(rolesNeeded, (value) => {
      return this.hasRole(value);
    });
  }

  allRole(rolesNeeded: string[]) {
    return every(rolesNeeded, (value) => {
      return this.hasRole(value);
    });
  }

  public hasRole(roleSearched: string): boolean {

    let rolesUser: string[] = this.authenticationService.getRoles();

    return indexOf(rolesUser, roleSearched) != -1;
  }
}
