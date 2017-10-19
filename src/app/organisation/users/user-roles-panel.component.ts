import { Component, Input, Output, EventEmitter } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';

import { ModalService }			from '../../util/modal/modal.service';

import { YawlResourcesDialogsModule }	from '../../yawl/resources/yawl-resources-dialogs.module';
import { RoleSelectDialogComponent }	from '../../yawl/resources/dialogs/role-select-dialog.component';

import { UserRoleMappingService } from '../../yawl/resources/services/user-role-mapping.service';
import { Role } from '../../yawl/resources/entities/role.entity';
import { User } from '../../yawl/resources/entities/user.entity';


@Component({
    selector: 'user-roles-panel',
    templateUrl: 'user-roles-panel.component.html'
})
export class UserRolesPanelComponent {

	@Input("user")
	user : User = null;

	@Output()
	roleAdded = new EventEmitter();

	@Output()
	roleRemoved = new EventEmitter();

	private roles : Role[] = [];
	private selectedRole : Role = null;

	private isLoading = false;


	constructor(
		private modalService : ModalService,
		private notificationsService : NotificationsService,
		private userRoleMappingService : UserRoleMappingService) {
	}


	ngOnChanges() {
		this.loadUserRoles();
	}


	private loadUserRoles() {
		this.isLoading = true;
		this.selectedRole = null;

		this.userRoleMappingService.getRolesByUser(this.user.id).subscribe((loadedRoles) => {
			this.roles = loadedRoles;
		},
		() => {
			this.notificationsService.error("Error", "Could not load roles!");
		},
		() => {
			this.isLoading = false;
		});

	}


	intendAddRole() {
		let ignore = this.roles.map((t) => t.id);
		let modal = this.modalService.create(YawlResourcesDialogsModule, RoleSelectDialogComponent, {
				'ignore': ignore,
				'onSelected': (role) => this.addRole(role)
			});
		modal.subscribe((ref) => {});
	}


	addRole(role : Role) {
		this.userRoleMappingService.addUserRoleLink(this.user.id, role.id).subscribe(() => {
			this.loadUserRoles();
			this.roleAdded.emit(role);
		},
		(error) => {
			this.notificationsService.error("Could not add role!", error);
		},
		() => {
		});
	}


	removeSelected() {
		let role = this.selectedRole;
		if(!role) {
			return;
		}

		this.userRoleMappingService.deleteUserRoleLink(this.user.id, role.id).subscribe(() => {
			this.loadUserRoles();
			this.roleRemoved.emit(role);
		},
		(error) => {
			this.notificationsService.error("Could not remove role!", error);
		},
		() => {
		});
	}

}
