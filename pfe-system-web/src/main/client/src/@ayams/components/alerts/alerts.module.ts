import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {AlertsComponent} from './alerts.component';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule
    ],
    declarations: [AlertsComponent],
    exports: [AlertsComponent]
})
export class AlertsModule {
}
