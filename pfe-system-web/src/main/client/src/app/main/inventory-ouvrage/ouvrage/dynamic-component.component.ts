import { EventEmitter } from '@angular/core';

export interface DynamicComponent {
    validateEvent: EventEmitter<string>;
    cancelEvent: EventEmitter<string>;
    data: any;
}
