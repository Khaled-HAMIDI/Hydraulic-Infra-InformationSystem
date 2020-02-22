import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseSharedModule } from '@fuse/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { AgmCoreModule } from '@agm/core';
import { UnitShowEditService } from './show-edit/unit-show-edit.service';
import { UnitShowEditComponent } from './show-edit/unit-show-edit.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AyamsModule } from '@ayams/ayams.module';


const routes = [
    {
        path: '**',
        component: UnitShowEditComponent,
        resolve: {
            data: UnitShowEditService
        }
    }
];

@NgModule({
    declarations: [
        UnitShowEditComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        FuseSharedModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatCardModule,
        TranslateModule,
        LeafletModule,
        AyamsModule,

        AgmCoreModule.forRoot({
            apiKey: ''
        }),

    ]
})
export class UnitModule {
}
