import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DrawComponent } from './draw/draw.component';


const routes: Routes = [
    {
        path: '',
        component: DrawComponent,
    }
];

@NgModule({
  declarations: [DrawComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SynopticModule { }
