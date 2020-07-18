import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTreeModule} from '@angular/material/tree';
import { AuthenticationGuard } from 'app/guards/authentication.guard';
import { AyamsModule } from '@ayams/ayams.module';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { MatDatepickerModule } from "@angular/material/datepicker";
import {DragDropModule} from '@angular/cdk/drag-drop';
import { SiteListComponent} from    './list/site-list/site-list.component';
import { SiteListService} from    './list/site-list/site-list.service';
import { SitesSelectedBarComponent } from './list/selected-bar/selected-bar.component';
import { SiteAddEditComponent } from './site-add-edit/site-add-edit.component';
import { SiteAddEditService } from './site-add-edit/site-add-edit.service';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

const routes: Routes = [
  
    {
        path: 'add',
        component: SiteAddEditComponent,
        data: { action: 'add' },
        resolve: {
            data: SiteAddEditService
        }
    },
    {
        path: 'edit/:id',
        component: SiteAddEditComponent,
        data: { action: 'edit' },
        resolve: {
            data: SiteAddEditService
        }
    },
    {
        path: '',
        component: SiteListComponent,
        resolve: {
            data: SiteListService
        }
    }
];

@NgModule({
    declarations: [SiteListComponent,SitesSelectedBarComponent,SiteAddEditComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatExpansionModule,
        MatPaginatorModule,
        MatIconModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatMenuModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatSlideToggleModule,
        FormsModule,
        FuseConfirmDialogModule,
        FuseSharedModule,
        FuseWidgetModule,
        TranslateModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatListModule,
        MatToolbarModule,
        AyamsModule,
        MatTreeModule,
        NgxMaskModule.forRoot(options),
        MatDatepickerModule,
        DragDropModule
    ]
})
export class SiteModule { }
