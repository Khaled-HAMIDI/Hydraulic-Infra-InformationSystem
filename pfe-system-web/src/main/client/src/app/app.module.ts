import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';
import { LOCALE_ID, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { UserIdleModule } from 'angular-user-idle';
import { AppComponent } from 'app/app.component';
import { fuseConfig } from 'app/fuse-config';
import { LayoutModule } from 'app/layout/layout.module';
import 'hammerjs';
import { ToastrModule } from 'ngx-toastr';
import { AuthenticationGuard } from './guards/authentication.guard';
import { HomeModule } from './main/home/home.module';
import { environment } from '../environments/environment';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

// FOR DECIMAL PIPE
registerLocaleData(localeFr, 'fr');

registerLocaleData(localeFr);

export function jwtTokenGetter(): string {
    return localStorage.getItem('access_token');
}

const appRoutes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./main/authentication/authentication.module').then(m => m.AuthenticationModule)
    },
    {
        path: 'admin',
        loadChildren: () => import('./main/admin/admin.module').then(m => m.AdminModule),
        canActivate: [AuthenticationGuard]
    },

    {
        path: 'profile',
        loadChildren: () => import('./main/profile/profile.module').then(m => m.ProfileModule),
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'print',
        loadChildren: () => import('./main/print/print.module').then(m => m.PrintModule),
        canActivate: [AuthenticationGuard]
    },
    { path: 'patrimony', 
      loadChildren: () => import('./main/inventaire-ouvrage/inventaire-ouvrage.module').then(m => m.InventaireOuvrageModule),
      canActivate: [AuthenticationGuard]
    },
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,


        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        HomeModule,

        UserIdleModule.forRoot({ idle: environment.lockScreenTimer, timeout: 5, ping: 1 }),

        ToastrModule.forRoot({
            timeOut: 5000,
            positionClass: 'toast-top-right',
            tapToDismiss: true,
            newestOnTop: true,
            closeButton: true,
        }),

        // JwtModule
        JwtModule.forRoot({
            config: {
                tokenGetter: jwtTokenGetter,
                whitelistedDomains: ['ouvrage.ade.dz', 'ouvrage.loc.ade.dz'],
                blacklistedRoutes: ['ouvrage.ade.dz/api/auth/login', 'ouvrage.loc.ade.dz/api/auth/login'],
                throwNoTokenError: false
            }
        }),
        //leaflet
        LeafletModule.forRoot()
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }]
})
export class AppModule {
}
