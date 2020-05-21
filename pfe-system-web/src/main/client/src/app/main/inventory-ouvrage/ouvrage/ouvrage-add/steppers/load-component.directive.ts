import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[host]'
})
export class LoadComponenteDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
