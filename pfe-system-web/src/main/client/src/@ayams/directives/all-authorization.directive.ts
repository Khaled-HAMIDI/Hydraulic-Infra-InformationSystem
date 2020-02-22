import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { AuthorizationService } from '@ayams/services/authorization.service';

@Directive({
  selector: '[ayamsHasAllPermissions]'
})
export class AllAuthorizationDirective {

  constructor(
		private authorizationService: AuthorizationService,
		private templateRef: TemplateRef<any>,
		private viewContainer: ViewContainerRef
	) { }

	@Input() set ayamsHasAllPermissions(authorizations: string[]) {
		let accessAuthorized = !authorizations ? true : this.authorizationService.allPermitted(authorizations);

		if (accessAuthorized) {
			this.viewContainer.createEmbeddedView(this.templateRef);
			return;
		}

		this.viewContainer.clear();
	}

}
