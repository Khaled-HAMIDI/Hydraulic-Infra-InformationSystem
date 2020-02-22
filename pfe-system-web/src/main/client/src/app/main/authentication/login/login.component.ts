import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { LoginService } from '../login.service';
import { Login } from '../../model/admin.model';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';
import { UserIdleService } from 'angular-user-idle';

@Component({
    selector   : 'fuse-login',
    templateUrl: './login.component.html',
    styleUrls  : ['./login.component.scss'],
    animations : fuseAnimations
})
export class FuseLoginComponent implements OnInit
{
    loginForm: FormGroup;
    loginFormErrors: any;
    


    constructor(
        public loginService : LoginService,
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,
        private fuseTranslationLoader: FuseTranslationLoaderService,
        private userIdle: UserIdleService,
    )
    {
        this.fuseConfig.config = {
            layout: {
                navbar : {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer : {
                    hidden: true
                }
            }
        };

        this.loginFormErrors = {
            username   : {},
            password: {}
        };

        this.fuseTranslationLoader.loadTranslations(french, arabic);
    }

    ngOnInit()
    {
        this.loginForm = this.formBuilder.group({
            username   : ['', Validators.required],
            password: ['', Validators.required]
        });

        this.loginForm.valueChanges.subscribe(() => {
            this.onLoginFormValuesChanged();
        });
        localStorage.clear
        this.userIdle.stopWatching();
    }

    onLoginFormValuesChanged()
    {
        for ( const field in this.loginFormErrors )
        {
            if ( !this.loginFormErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.loginFormErrors[field] = {};

            // Get the control
            const control = this.loginForm.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.loginFormErrors[field] = control.errors;
            }
        }
    }

    onSubmitForm(){
        const loginValues = this.loginForm.getRawValue();
        const login = new Login(loginValues);
        this.loginService.checkLogin(login); 
    }
}
