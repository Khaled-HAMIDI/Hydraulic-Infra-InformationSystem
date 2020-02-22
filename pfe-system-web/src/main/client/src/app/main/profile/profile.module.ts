import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationGuard } from 'app/guards/authentication.guard';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileAboutComponent } from './tabs/about/about.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { FuseSharedModule } from '@fuse/shared.module';
import { ProfileService } from './profile.service';
import { TranslateModule } from '@ngx-translate/core';

const routes = [
  {
    path: '',
    component: ProfileComponent,
    resolve: {
      data: ProfileService
    },
    canActivate: [AuthenticationGuard]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileAboutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    // ANGULAR MATERIAL
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatTabsModule,

    FuseSharedModule,
    TranslateModule,
  ]
})
export class ProfileModule { }
