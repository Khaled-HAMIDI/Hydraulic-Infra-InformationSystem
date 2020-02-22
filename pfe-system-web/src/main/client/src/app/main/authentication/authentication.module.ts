import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { FuseSharedModule } from '@fuse/shared.module';

import { FuseLoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { TranslateModule } from '@ngx-translate/core';
import { ConnectedGuard } from 'app/guards/connected.guard';
import { PasswordChangedGuard } from 'app/guards/passwordChanged.guard';
import { LockScreenComponent } from './lockscreen/lockscreen.component';

const routes = [
    {
        path: 'login',
        component: FuseLoginComponent,
        canActivate: [ConnectedGuard]
    },
    {
        path: 'change-password',
        component: ChangePasswordComponent,
        canActivate: [PasswordChangedGuard]
    },
    {
        path: 'lockscreen',
        component: LockScreenComponent
    },
    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];

@NgModule({
    declarations: [
        FuseLoginComponent,
        ChangePasswordComponent,
        LockScreenComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,

        FuseSharedModule,
        TranslateModule,
    ]
})
export class AuthenticationModule {
}
