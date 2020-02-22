import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { AyamsComponentsModule } from './components/components.module';
import { AyamsDirectivesModule } from './directives/directives.module';

@NgModule({
    imports: [
        CommonModule,

        MatDialogModule,
        // FUSE
        // FuseSharedModule,
        // FuseConfirmDialogModule,

        // FX LAYOUT
        // FlexLayoutModule,
    ],
    declarations: [],
    exports: [
        AyamsDirectivesModule,
        AyamsComponentsModule
    ]
})
export class AyamsModule {
}
