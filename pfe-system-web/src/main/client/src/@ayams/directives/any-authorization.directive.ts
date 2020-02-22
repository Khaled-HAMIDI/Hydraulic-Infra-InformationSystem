import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthorizationService } from '@ayams/services/authorization.service';

@Directive({
	selector: '[ayamsHasAnyPermissions]'
})
export class AnyAuthorizationDirective {

	constructor(
		private authorizationService: AuthorizationService,
		private templateRef: TemplateRef<any>,
		private viewContainer: ViewContainerRef
	) { }

	@Input() set ayamsHasAnyPermissions(authorizations: string[]) {
		let accessAuthorized = !authorizations ? true : this.authorizationService.somePermitted(authorizations);

		if (accessAuthorized) {
			this.viewContainer.createEmbeddedView(this.templateRef);
			return;
		}

		this.viewContainer.clear();
	}
}
