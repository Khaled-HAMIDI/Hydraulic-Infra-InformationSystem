import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { RoleService } from '@ayams/services/role.service';

@Directive({
  selector: '[ayamsHasAnyRoles]'
})
export class AnyRoleDirective {

  constructor(
		private roleService: RoleService,
		private templateRef: TemplateRef<any>,
		private viewContainer: ViewContainerRef
	) { }

	@Input() set ayamsHasAnyRoles(roles: string[]) {
		let accessAuthorized = !roles ? true : this.roleService.someRole(roles);

		if (accessAuthorized) {
			this.viewContainer.createEmbeddedView(this.templateRef);
			return;
		}

		this.viewContainer.clear();
	}

}
