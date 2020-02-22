import { Injectable } from '@angular/core';
import { AuthenticationService } from 'app/main/authentication/authentication.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API } from 'config/api.config';
import { User } from '../model/admin.model';

const USER_API = API +  '/users/whoami';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  about: any;
  aboutOnChanged: BehaviorSubject<any>;
  
  constructor(
    private authenticationService: AuthenticationService,
    private http: HttpClient
  ) { 
    this.about = new User();
    this.aboutOnChanged = new BehaviorSubject({});
  }

  getFullName(): string {
    var token = this.authenticationService.getDecodedToken();

    return token && token.fullName ? token.fullName : "Inexistant";
  }

  getEmail(): string {
    var token = this.authenticationService.getDecodedToken();

    return token && token.email ? token.email : "Inexistant@ade.dz";
  }

  getAvatar(): string {
    var token = this.authenticationService.getDecodedToken();

    return token && token.avatar ? token.avatar : "assets/images/avatars/Velazquez.jpg";
  }

  // RESOLVE FUNCTION
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getAbout(),
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  getAbout(): Promise<any[]>
    {
        return new Promise((resolve, reject) => {

            this.http.get(USER_API)
                .subscribe((about: any) => {
                    this.about = about;
                    this.aboutOnChanged.next(this.about);
                    resolve(this.about);
                }, reject);
        });
    }
}
