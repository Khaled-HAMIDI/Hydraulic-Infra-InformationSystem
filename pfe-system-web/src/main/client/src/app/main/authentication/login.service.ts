import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';
import {API} from 'config/api.config';
import {ToolsService} from '@ayams/services/tools.service';
import {Location} from '@angular/common';
import {UserIdleService} from 'angular-user-idle';
import {LoginResponse, Login} from '../model/admin.model';
import {BehaviorSubject} from 'rxjs';
import {SocketService} from "../admin/user/notification/socket.service";

const LOGIN_API = API + '/auth/login';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    loginResponse: LoginResponse;
    disabled: boolean;

    hideNavToolBarFooterSubject: BehaviorSubject<any>;

    constructor(
        private authenticationService: AuthenticationService,
        private http: HttpClient,
        private router: Router,
        private toolsService: ToolsService,
        private location: Location,
        private userIdle: UserIdleService,
        private socketService: SocketService
    ) {
        this.disabled = false;
        this.loginResponse = new LoginResponse({});
        this.hideNavToolBarFooterSubject = new BehaviorSubject(false);
    }

    logout() {
        this.authenticationService.signOut();
        this.hideNavToolBarFooterSubject.next(true);
        this.router.navigate(['/auth']);
    }

    login(login: Login) {
        return new Promise((resolve, reject) => {
            this.http.post(LOGIN_API, login)
                .subscribe((loginResponse: LoginResponse) => {
                    resolve(loginResponse);
                }, reject);
        });
    }

    checkLogin(login: Login, redirect: Boolean = true): void {
        this.disabled = true;
        this.toolsService.showProgressBar();

        this.login(login).then(
            (loginResponse: any) => {
                this.loginResponse = new LoginResponse(loginResponse);
                this.authenticationService.saveToken(loginResponse.access_token);
                this.socketService.initSocket();
                (!redirect) ? this.toolsService.showSuccess('LOCKSCREEN.TOAST.success') : this.toolsService.showSuccess('LOGIN.TOAST.success');
                this.disabled = false;
                this.userIdle.startWatching();
                if (!redirect) {
                    this.location.back();
                }

                if (this.authenticationService.isPasswordChanged()) {
                    this.hideNavToolBarFooterSubject.next(false);
                    this.router.navigate(['crud/subscribers/search']);
                } else {
                    this.router.navigate(['auth/change-password']);
                }
            },
            (error) => {
                console.log(error);

                this.disabled = false;
                this.toolsService.hideProgressBar();
                (!redirect) ? this.toolsService.showError('LOCKSCREEN.TOAST.error') : this.toolsService.showError('LOGIN.TOAST.error');
            }
        );
    }
}
