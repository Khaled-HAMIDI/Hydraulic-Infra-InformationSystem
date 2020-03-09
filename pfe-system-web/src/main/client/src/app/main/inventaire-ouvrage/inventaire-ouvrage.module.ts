import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { InventaireOuvrageComponent } from './inventaire-ouvrage.component';
import { AuthenticationGuard } from 'app/guards/authentication.guard';


const routes: Routes = [
  {
    path: 'synoptic',
    loadChildren: () => import('./synoptic/synoptic.module').then(m => m.SynopticModule),
    canActivate: [AuthenticationGuard]
    
}
];

@NgModule({
  declarations: [InventaireOuvrageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class InventaireOuvrageModule { }
