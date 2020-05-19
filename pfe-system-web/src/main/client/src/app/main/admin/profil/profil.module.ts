import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import { FuseSharedModule } from '@fuse/shared.module';
import { ProfilListComponent } from './list/profil-list.component';
import { FuseConfirmDialogModule } from '@fuse/components';
import { ProfilAddEditComponent } from './add-edit/profil-add-edit.component';
import { ProfilShowComponent } from './show/profil-show.component';
import { TranslateModule } from '@ngx-translate/core';
import { ProfilsSelectedBarComponent } from './list/selected-bar/selected-bar.component';
import { ProfilShowService } from './show/profil-show.service';
import { ProfilAddEditService } from './add-edit/profil-add-edit.service';
import { ProfilListService } from './list/profil-list.service';
import { AlertsModule } from '@ayams/components/alerts/alerts.module';
import { AyamsModule } from '@ayams/ayams.module';




const routes = [
    {
        path: 'add',
        component: ProfilAddEditComponent,
        data: { action: 'add' },
        resolve: {
            data: ProfilAddEditService
        }
    },
    {
        path: ':id/edit',
        component: ProfilAddEditComponent,
        data: { action: 'edit' },
        resolve: {
            data: ProfilAddEditService
        }
    },
    {
        path: ':id/show',
        component: ProfilShowComponent,
        resolve: {
            data: ProfilShowService
        }
    },
    {
        path: '**',
        component: ProfilListComponent,
        resolve: {
            data: ProfilListService
        }
    }
];

@NgModule({
    declarations: [
        ProfilListComponent,
        ProfilsSelectedBarComponent,
        ProfilAddEditComponent,
        ProfilShowComponent
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
        MatTabsModule,
        MatTreeModule,
        FuseSharedModule,
        MatCheckboxModule,
        FuseConfirmDialogModule,
        MatTooltipModule,
        MatCardModule,
        MatChipsModule,
        MatAutocompleteModule,
        TranslateModule,
        AlertsModule,
        AyamsModule
                
    ]
})
export class ProfilModule {
}
