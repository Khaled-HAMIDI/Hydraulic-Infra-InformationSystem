import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatCheckboxModule } from '@angular/material';
import { FuseSidebarModule } from '@fuse/components';
import { ReportComponent } from './report.component';
import { AuthenticationGuard } from 'app/guards/authentication.guard';
import { PrintReportDialogComponent } from './dialog/print-report-dialog.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { PrintReportDialogService } from './dialog/print-report-dialog.service';

const routes = [
    {
        path: '**',
        component: ReportComponent,
        canActivate: [AuthenticationGuard]
    }
];

@NgModule({
    declarations: [
        ReportComponent,
        PrintReportDialogComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatCheckboxModule,

        FuseSharedModule,
        FuseSidebarModule,

        TranslateModule
    ],
    exports: [
        ReportComponent
    ],
    entryComponents: [
        PrintReportDialogComponent
    ], 
    providers: [
        PrintReportDialogService
    ]
})

export class ReportModule {
}
