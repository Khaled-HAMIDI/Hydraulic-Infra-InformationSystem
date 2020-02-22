import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintComponent } from './print.component';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [ 
  {
    path: '**',
    component: PrintComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    PdfJsViewerModule,
    RouterModule.forChild(appRoutes),
  ],
  declarations: [PrintComponent],
  exports: [PrintComponent]
})
export class PrintModule { }
