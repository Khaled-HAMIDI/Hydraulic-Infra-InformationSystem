import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from 'app/guards/authentication.guard';
import { OuvrageListComponent } from './list/ouvrage-list/ouvrage-list.component';
import { OuvrageListService } from './list/ouvrage-list/ouvrage-list.service';


const routes: Routes = [
  {
    path: '**',
    component: OuvrageListComponent,
    resolve: {data: OuvrageListService}
}
];

@NgModule({
  declarations: [OuvrageListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class OuvrageModule { }
