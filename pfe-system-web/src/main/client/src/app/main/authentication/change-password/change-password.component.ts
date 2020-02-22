import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';
import { ChangePasswordService } from './change-password.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  animations: fuseAnimations
})
export class ChangePasswordComponent implements OnInit {

  loginForm: FormGroup;
  loginFormErrors: any;

  constructor(
    public  changePasswordService: ChangePasswordService,
    private fuseConfig: FuseConfigService,
    private formBuilder: FormBuilder,
    private fuseTranslationLoader: FuseTranslationLoaderService
  ) {
    this.fuseConfig.config = {
      layout: {
        navbar: {
          hidden: true
        },
        toolbar: {
          hidden: true
        },
        footer: {
          hidden: true
        }
      }
    };

    this.loginFormErrors = {
      currentPassword: {},
      newPassword: {},
      newPasswordCopy: {},
    };
    
    this.fuseTranslationLoader.loadTranslations(french, arabic);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, this.samePasswordValidator()]],
      newPasswordCopy: ['', [Validators.required, this.passwordValidator()]],
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.onLoginFormValuesChanged();
    });

  }

  onLoginFormValuesChanged() {
    for (const field in this.loginFormErrors) {
      if (!this.loginFormErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.loginFormErrors[field] = {};

      // Get the control
      const control = this.loginForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.loginFormErrors[field] = control.errors;
      }
    }
  }

  onSubmitForm() {
    const passwordsValue = this.loginForm.getRawValue();

    if(passwordsValue.newPassword === passwordsValue.newPasswordCopy)
      this.changePasswordService.changePassword(passwordsValue);
  }

  
  passwordValidator(): ValidatorFn {

    return (control: AbstractControl): { [key: string]: any } | null => {

        var newPassword = this.loginForm ? this.loginForm.get('newPassword').value : '';
        var currentPassword = this.loginForm ? this.loginForm.get('currentPassword').value : '';

        const forbidden = (newPassword != control.value) || (currentPassword== control.value);  

        return forbidden ? { 'different': true } : null;

    };
}


samePasswordValidator(): ValidatorFn {

  return (control: AbstractControl): { [key: string]: any } | null => {

      var currentPassword = this.loginForm ? this.loginForm.get('currentPassword').value : '';

      const forbidden = currentPassword == control.value;  

      return forbidden ? { 'sameCurrentPswd': true } : null;

  };
}



}
