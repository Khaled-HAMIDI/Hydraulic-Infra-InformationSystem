import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseSharedModule } from '@fuse/shared.module';
import { CenterListComponent } from './list/center-list.component';
import { FuseConfirmDialogModule } from '@fuse/components';
import { CenterAddEditComponent } from './add-edit/center-add-edit.component';
import { CenterShowComponent } from './show/center-show.component';
import { TranslateModule } from '@ngx-translate/core';
import { CenterShowService } from './show/center-show.service';
import { CenterAddEditService } from './add-edit/center-add-edit.service';
import { CenterListService } from './list/center-list.service';
import { CentersSelectedBarComponent } from './list/selected-bar/selected-bar.component';
import { AyamsModule } from '@ayams/ayams.module';
import { AgmCoreModule } from '@agm/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

const routes = [
    {
        path: 'add',
        component: CenterAddEditComponent,
        data: { action: 'add' },
        resolve: {
            data: CenterAddEditService
        }
    },
    {
        path: ':id/edit',
        component: CenterAddEditComponent,
        data: { action: 'edit' },
        resolve: {
            data: CenterAddEditService
        }
    },
    {
        path: ':id/show',
        component: CenterShowComponent,
        resolve: {
            data: CenterShowService
        }
    },
    {
        path: '**',
        component: CenterListComponent,
        resolve: {
            data: CenterListService
        }
    }
];

@NgModule({
    declarations: [
        CenterListComponent,
        CentersSelectedBarComponent,
        CenterAddEditComponent,
        CenterShowComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatSelectModule,
        MatMenuModule,
        MatSortModule,
        MatTableModule,
        FuseSharedModule,
        MatCheckboxModule,
        FuseConfirmDialogModule,
        MatTooltipModule,
        MatCardModule,
        TranslateModule,
        LeafletModule,
        AyamsModule,
        
        AgmCoreModule.forRoot({
            apiKey: ''
        }),
        AyamsModule
    ]
})
export class CenterModule {
}
