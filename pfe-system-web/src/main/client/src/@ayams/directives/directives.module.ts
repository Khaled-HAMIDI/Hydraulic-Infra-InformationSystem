import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisableControlDirective } from './disable-control.directive';
import { AllAuthorizationDirective } from './all-authorization.directive';
import { AnyAuthorizationDirective } from './any-authorization.directive';
import { AllRoleDirective } from './all-role.directive';
import { AnyRoleDirective } from './any-role.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AllAuthorizationDirective,
    AnyAuthorizationDirective,
    AllRoleDirective,
    AnyRoleDirective,
    DisableControlDirective
  ],
  exports: [
    AllAuthorizationDirective,
    AnyAuthorizationDirective,
    AllRoleDirective,
    AnyRoleDirective, 
    DisableControlDirective
  ]
})
export class AyamsDirectivesModule { }
