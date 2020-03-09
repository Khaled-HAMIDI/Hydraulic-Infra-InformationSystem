import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from 'app/guards/authentication.guard';


const routes: Routes = [
  {
    path: 'synoptic',
    loadChildren: () => import('./synoptic/synoptic.module').then(m => m.SynopticModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'ouvrages',
    loadChildren: () => import('./ouvrage/ouvrage.module').then(m => m.OuvrageModule),
    canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class InventaireOuvrageModule { }
