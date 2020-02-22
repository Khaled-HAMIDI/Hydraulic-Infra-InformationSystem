import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'agencies',
    loadChildren: () => import('./agency/agency.module').then(m => m.AgencyModule)
  },
  {
    path: 'centers',
    loadChildren: () => import('./center/center.module').then(m => m.CenterModule)
  },
  {
    path: 'profils',
    loadChildren: () => import('./profil/profil.module').then(m => m.ProfilModule)
  },
  {
    path: 'unit',
    loadChildren: () => import('./unit/unit.module').then(m => m.UnitModule)
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
  ],
  declarations: []
})
export class AdminModule { }
