import { Injectable } from '@angular/core';
import { ToolsService } from '@ayams/services/tools.service';
import { API } from 'config/api.config';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from 'app/main/model/admin.model';
import { LoginService } from '../login.service';

const LOGIN_API = API + '/auth/change-password';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  disabled: boolean;

  constructor(
    private http: HttpClient,
    private toolsService: ToolsService,
    private loginService: LoginService
  ) {
    this.disabled = false;
  }


  changePassword(passwords: Object) {
    this.disabled = true;
    this.toolsService.showProgressBar();

    this.updatePassword(passwords).then(
      (loginResponse: LoginResponse) => {
        this.disabled = false;
        this.loginService.logout();
        this.toolsService.showSuccess('CHANGEPASSWORD.FORM.TOAST.success');
      },
      (error) => {
        console.log(error);
        this.disabled = false;
        this.toolsService.hideProgressBar();
        this.toolsService.showError('CHANGEPASSWORD.FORM.TOAST.error');
      }
    );
  }

  updatePassword(passwords: Object) {
    return new Promise((resolve, reject) => {
      this.http.post(LOGIN_API, passwords)
        .subscribe((response) => {
          resolve(response);
        }, reject);
    });
  }
}
