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
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTreeModule} from '@angular/material/tree';
import { AuthenticationGuard } from 'app/guards/authentication.guard';
import { ChainListComponent } from './list/chain-list/chain-list.component';
import { ChainListService } from './list/chain-list/chain-list.service';
import { AyamsModule } from '@ayams/ayams.module';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { ChainAddEditComponent } from './chain-add-edit/chain-add-edit.component';
import { ChainAddEditService } from "./chain-add-edit/chain-add-edit.service";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { ChainShowComponent } from './chain-show/chain-show.component';
import { ChainShowService } from './chain-show/chain-show.service';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

const routes: Routes = [
    {
        path: 'add',
        component: ChainAddEditComponent,
        data: { action: 'add' },
        resolve: {
            data: ChainAddEditService
        }
    },
    {
        path: ':id/edit',
        component: ChainAddEditComponent,
        data: { action: 'edit' },
        resolve: {
            data: ChainAddEditService
        }
    },
    {
        path: ':id/show',
        component: ChainShowComponent,
        resolve: {data: ChainShowService}
    },
    {
        path: 'list',
        component: ChainListComponent,
        resolve: { data: ChainListService }
    }
];

@NgModule({
    declarations: [ChainListComponent, ChainAddEditComponent, ChainShowComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatSortModule,
        MatTableModule,
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
    ]
})
export class ChainModule { }
