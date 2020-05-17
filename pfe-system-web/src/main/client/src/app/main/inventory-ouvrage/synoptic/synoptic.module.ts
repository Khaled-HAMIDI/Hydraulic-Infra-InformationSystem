import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DrawComponent } from './draw/draw.component';
import { DrawService } from './draw/draw.service';
import { MatIconModule } from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { AyamsModule } from '@ayams/ayams.module';
import { IConfig, NgxMaskModule } from 'ngx-mask';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

const routes: Routes = [
    {
        path: ':code',
        component: DrawComponent,
        resolve: {
          data: DrawService
      }
    }
];

@NgModule({
  declarations: [DrawComponent],
  imports: [
    MatIconModule,
    CommonModule,
    MatSelectModule,
    RouterModule.forChild(routes),
    FuseSharedModule,
    FuseConfirmDialogModule,
    FuseWidgetModule,
    TranslateModule,
    MatButtonModule,
    AyamsModule,
    NgxMaskModule
  ]
})
export class SynopticModule { }
