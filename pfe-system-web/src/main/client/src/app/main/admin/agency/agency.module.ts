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
import { AgencyListComponent } from './list/agency-list.component';
import { FuseConfirmDialogModule } from '@fuse/components';
import { AgencyAddEditComponent } from './add-edit/agency-add-edit.component';
import { AgencyShowComponent } from './show/agency-show.component';
import { TranslateModule } from '@ngx-translate/core';
import { AgenciesSelectedBarComponent } from './list/selected-bar/selected-bar.component';
import { AgencyListService } from './list/agency-list.service';
import { AgencyShowService } from './show/agency-show.service';
import { AgencyAddEditService } from './add-edit/agency-add-edit.service';
import { AyamsModule } from '@ayams/ayams.module';
import { AgmCoreModule } from '@agm/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';





const routes = [
    {
        path: 'add',
        component: AgencyAddEditComponent,
        data: { action: 'add' },
        resolve: {
            data: AgencyAddEditService
        },
        // canActivate: [AuthorizationGuard]
    },
    {
        path: ':id/edit',
        component: AgencyAddEditComponent,
        data: { action: 'edit' },
        resolve: {
            data: AgencyAddEditService
        },
        // canActivate: [AuthorizationGuard]
    },
    {
        path: ':id/show',
        component: AgencyShowComponent,
        resolve: {
            data: AgencyShowService
        },
        // canActivate: [AuthorizationGuard]
    },
    {
        path: '**',
        component: AgencyListComponent,
        resolve: {
            data: AgencyListService
        }
    }
];

@NgModule({
    declarations: [
        AgencyListComponent,
        AgenciesSelectedBarComponent,
        AgencyAddEditComponent,
        AgencyShowComponent
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

        // AYAMS
        AyamsModule
    ]
})
export class AgencyModule {
}
