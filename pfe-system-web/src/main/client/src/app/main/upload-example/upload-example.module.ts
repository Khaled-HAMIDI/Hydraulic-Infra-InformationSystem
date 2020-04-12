import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadExampleComponent } from './upload-example.component';
import { AyamsModule } from '@ayams/ayams.module';
import { Routes, RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatButtonModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

const appRoutes: Routes = [ 
  {
    path: '**',
    component: UploadExampleComponent
  }
];

@NgModule({
  declarations: [UploadExampleComponent],
  imports: [
    CommonModule,
    FuseSharedModule,
    MatButtonModule,
    AyamsModule,

    RouterModule.forChild(appRoutes)
  ]
})
export class UploadExampleModule { }
