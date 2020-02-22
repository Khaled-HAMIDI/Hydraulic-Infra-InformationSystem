import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { RoleService } from '@ayams/services/role.service';

@Directive({
  selector: '[ayamsHasAllRoles]'
})
export class AllRoleDirective {

  constructor(
		private roleService: RoleService,
		private templateRef: TemplateRef<any>,
		private viewContainer: ViewContainerRef
	) { }

	@Input() set ayamsHasAllRoles(roles: string[]) {
		let accessAuthorized = !roles ? true : this.roleService.allRole(roles);

		if (accessAuthorized) {
			this.viewContainer.createEmbeddedView(this.templateRef);
			return;
		}

		this.viewContainer.clear();
	}

}
