import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { FuseSharedModule } from '@fuse/shared.module';
import { AcademyCourseComponent } from './course/course.component';
import { AcademyCourseService } from './course/course.service';

import { FuseSidebarModule, FuseConfirmDialogModule } from '@fuse/components';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { AyamsModule } from '@ayams/ayams.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TestSecurityComponent } from './components/security/security.component';
import { TestEchelleComponent } from './components/reservoir-et-brise-charge/echelle/echelle.component';
import { TestFlotteurComponent } from './components/reservoir-et-brise-charge/flotteur/flotteur.component';
import { LoadComponenteDirective } from './course/load-component.directive';

const routes = [
    {
        path      : '**',
        component: AcademyCourseComponent,
        resolve  : {
            data: AcademyCourseService
        }
    }
];

@NgModule({
    declarations: [
        AcademyCourseComponent,
        LoadComponenteDirective,
        TestSecurityComponent,
        TestEchelleComponent,
        TestFlotteurComponent
    ],entryComponents:[
        TestSecurityComponent,
        TestEchelleComponent,
        TestFlotteurComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,

        TranslateModule,
        FuseSharedModule,
        FuseSidebarModule,

        MatCardModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatSlideToggleModule,
        FormsModule,
        FuseConfirmDialogModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatListModule,
        MatToolbarModule,
        MatTreeModule,
        AyamsModule,
        MatDatepickerModule,
    ],
    providers   : [
        AcademyCourseService
    ]
})
export class AcademyModule
{
}
