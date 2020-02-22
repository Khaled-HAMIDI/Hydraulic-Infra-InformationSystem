import { Component } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import includes from 'lodash/includes';

@Component({
    selector: 'fuse-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    constructor(private fuseTranslationLoader: FuseTranslationLoaderService,
        private router: Router,
        private authenticationService: AuthenticationService) {
        const userRoles = authenticationService.getRoles();

        if (includes(userRoles, "responsable commercial"))
            this.router.navigate(['dashboard/customerservicedashboards']);
        else if (includes(userRoles, "responsable facturation"))
            this.router.navigate(['dashboard/meterreading-invoicing']);

        this.fuseTranslationLoader.loadTranslations(french, arabic);
    }
}
