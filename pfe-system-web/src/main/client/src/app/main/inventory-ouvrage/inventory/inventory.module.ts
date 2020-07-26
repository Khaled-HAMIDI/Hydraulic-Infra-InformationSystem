import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import {FuseConfirmDialogModule, FuseSidebarModule} from '@fuse/components';
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
import { AyamsModule } from '@ayams/ayams.module';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { MatDatepickerModule } from "@angular/material/datepicker";
import {InventoryAddComponent} from "./inventory-add/inventory-add.component";
import { InventoryAddService } from './inventory-add/inventory-add.service';
import {MatTabsModule} from "@angular/material/tabs";
import {MatExpansionModule} from "@angular/material/expansion";
import { CurrentInventoryComponent } from './current-inventory/current-inventory.component';
import {CurrentInventoryService} from "./current-inventory/current-inventory.service";
import { CompletedInventoriesComponent } from './completed-inventories/completed-inventories.component';
import {CompletedInventoriesService} from "./completed-inventories/completed-inventories.service";
import { InventoryStepperComponent } from './composant/inventory-stepper/inventory-stepper.component';
import { InventoryComposantComponent } from './composant/inventory-composant/inventory-composant.component';
import {LoadComponenteDirective} from "./load-component.directive";
import {SecurityComponent} from "../ouvrage/composant/composant-add-edit/security/security.component";
import {InventoryStepperService} from "./composant/inventory-stepper/inventory-stepper.service";
import { CompletedInventoryComponent } from './completed-inventory/completed-inventory.component';
import {CompletedInventoryService} from "./completed-inventory/completed-inventory.service";
import { SyntheseComponent } from './synthese/synthese.component';
import {SyntheseService} from "./synthese/synthese.service";


export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

const routes: Routes = [
    {
        path: 'add',
        component: InventoryAddComponent,
        data: {action: 'add'},
        resolve: {
            data: InventoryAddService
        }
    },
    {
        path: 'current',
        component: CurrentInventoryComponent,
        resolve: {
            data: CurrentInventoryService
        }
    },
    {
        path: 'current/synthese/:codeInventory',
        component: SyntheseComponent,
        resolve: {
            data: SyntheseService
        }
    },
    {
        path: 'current/:codeInventory/:type/:codeOuvrage',
        component: InventoryStepperComponent,
        resolve: {
            data: InventoryStepperService
        }
    },
    {
        path: 'completed',
        component: CompletedInventoriesComponent,
        resolve: {
            data: CompletedInventoriesService
        }
    },
    {
        path: 'completed/:codeInventory',
        component: CompletedInventoryComponent,
        resolve: {
            data: CompletedInventoryService
        }
    }
];

@NgModule({
    declarations: [InventoryAddComponent, CurrentInventoryComponent, CompletedInventoriesComponent, InventoryStepperComponent, InventoryComposantComponent, LoadComponenteDirective, CompletedInventoryComponent, SyntheseComponent],
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
        MatTabsModule,
        MatExpansionModule,
        FuseSidebarModule,
    ],entryComponents:[
        InventoryComposantComponent
        ]
})
export class InventoryModule { }
