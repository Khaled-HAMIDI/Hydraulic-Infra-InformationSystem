import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {DuallistboxComponent} from './duallistbox.component';
import {FuseSharedModule} from '@fuse/shared.module';

@NgModule({
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
        MatListModule,
        MatButtonModule
    ],
    declarations: [DuallistboxComponent],
    exports: [DuallistboxComponent]
})
export class DuallistboxModule {
}
