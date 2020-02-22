import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FileUploaderComponent} from './file-uploader.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatDialogModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatProgressBarModule,
        MatListModule,
        MatDialogModule,
        TranslateModule
    ],
    declarations: [FileUploaderComponent],
    exports: [FileUploaderComponent]
})
export class FileUploaderModule {
}
