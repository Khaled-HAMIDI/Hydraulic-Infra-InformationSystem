import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {FuseSharedModule} from '@fuse/shared.module';
import {FuseConfirmDialogModule} from '@fuse/components';
import {FuseWidgetModule} from '@fuse/components/widget/widget.module';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AuthenticationGuard } from 'app/guards/authentication.guard';
import { OuvrageListComponent } from './list/ouvrage-list/ouvrage-list.component';
import { OuvrageListService } from './list/ouvrage-list/ouvrage-list.service';
import { AyamsModule } from '@ayams/ayams.module';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { OuvrageAddComponent } from './ouvrage-add/ouvrage-add.component';
import { OuvrageEditComponent } from './ouvrage-edit/ouvrage-edit.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import { OuvrageShowComponent } from './ouvrage-show/ouvrage-show.component';
import { StationTraitementConvComponent } from './ouvrage-add/Type/station-traitement-conv/station-traitement-conv.component';
import { StationPompageComponent } from './ouvrage-add/Type/station-pompage/station-pompage.component';
import { ReservoirComponent } from './ouvrage-add/Type/reservoir/reservoir.component';
import { ForageComponent } from './ouvrage-add/Type/forage/forage.component';
import { BriseChargeComponent } from './ouvrage-add/Type/brise-charge/brise-charge.component';
import { StationNonConvComponent } from './ouvrage-add/Type/station-non-conv/station-non-conv.component';;

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

const routes: Routes = [
    {
        path: 'add',
        component: OuvrageAddComponent,
        data: {action: 'add'}
    },
    {
        path: 'add/StationTraitementConventionelle',
        component: StationTraitementConvComponent,
        data: {action: 'add'}
    },
    {
        path: 'add/Reservoir',
        component: ReservoirComponent,
        data: {action: 'add'}
    },
    {
        path: 'add/Forage',
        component: ForageComponent,
        data: {action: 'add'}
    },
    {
        path: 'add/StationPompage',
        component: StationPompageComponent,
        data: {action: 'add'}
    },
    {
        path: 'add/BriseCharge',
        component: BriseChargeComponent,
        data: {action: 'add'}
    },
    {
        path: 'add/StationTraitementNonConventionelle',
        component: StationNonConvComponent,
        data: {action: 'add'}
    },
    {
        path: ':code/edit',
        component: OuvrageEditComponent,
        data: {action: 'edit'}
    },
    {
        path: ':code/show',
        component: OuvrageShowComponent
    },
  {
    path: '**',
    component: OuvrageListComponent,
    resolve: {data: OuvrageListService}
}
];

@NgModule({
  declarations: [OuvrageListComponent, OuvrageAddComponent, OuvrageEditComponent, OuvrageShowComponent, StationTraitementConvComponent, StationPompageComponent, ReservoirComponent, ForageComponent, BriseChargeComponent, StationNonConvComponent],
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
        NgxMaskModule.forRoot(options),
        MatDatepickerModule,
    ]
})
export class OuvrageModule { }
