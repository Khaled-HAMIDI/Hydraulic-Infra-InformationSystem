import {FileUploaderModule} from './file-uploader/file-uploader.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertsModule} from './alerts/alerts.module';
import { DuallistboxModule } from './duallistbox/duallistbox.module';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [],
    exports: [
        AlertsModule,
        DuallistboxModule,
        FileUploaderModule,
    ]
})
export class AyamsComponentsModule {
}
