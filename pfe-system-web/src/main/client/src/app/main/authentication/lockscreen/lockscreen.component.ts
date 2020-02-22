import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { UserIdleService } from 'angular-user-idle';
import { AuthenticationService } from '../authentication.service';
import { LoginService } from '../login.service';
import { Login } from '../../model/admin.model';

@Component({
    selector: 'lockscreen',
    templateUrl: './lockscreen.component.html',
    styleUrls: ['./lockscreen.component.scss'],
    animations: fuseAnimations
})

export class LockScreenComponent implements OnInit {
    readonly googlePlayLink: string;
    readonly appStoreLink: string;
    lockScreenForm: FormGroup;
    lockScreenFormErrors: any;

    constructor(
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,
        private fuseTranslationLoader: FuseTranslationLoaderService,
        private userIdle: UserIdleService,
        private authenticationService: AuthenticationService,
        private loginService: LoginService,
    ) {
        this.fuseConfig.setConfig({
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
        });

        this.lockScreenFormErrors = {
            username: {},
            password: {}
        };

        this.fuseTranslationLoader.loadTranslations(french, arabic);
    }

    ngOnInit() {
        this.lockScreenForm = this.formBuilder.group({
            username: [
                {
                    value: this.authenticationService.getUsername(),
                    disabled: false
                }, Validators.required
            ],
            password: ['', Validators.required]
        });

        this.lockScreenForm.valueChanges.subscribe(() => {
            this.onLockFormValuesChanged();
        });

        let signOut = () => this.authenticationService.signOut();
        setTimeout(signOut, 2000);
    }

    onLockFormValuesChanged() {
        for (const field in this.lockScreenFormErrors) {
            if (!this.lockScreenFormErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.lockScreenFormErrors[field] = {};

            // Get the control
            const control = this.lockScreenForm.get(field);

            if (control && control.dirty && !control.valid) {
                this.lockScreenFormErrors[field] = control.errors;
            }
        }
    }

    onSubmitForm() {
        this.userIdle.resetTimer();
        const loginValues = this.lockScreenForm.getRawValue();
        const login = new Login(loginValues);
        this.loginService.checkLogin(login, false);
    }
}
