import { Component, Input, Output, EventEmitter } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';

import { ModalService }			from '../../util/modal/modal.service';

import { YawlResourcesDialogsModule }	from '../../yawl/resources/yawl-resources-dialogs.module';
import { UserSelectDialogComponent }	from '../../yawl/resources/dialogs/user-select-dialog.component';

import { UserCapabilityMappingService } from '../../yawl/resources/services/user-capability-mapping.service';
import { Capability } from '../../yawl/resources/entities/capability.entity';
import { User } from '../../yawl/resources/entities/user.entity';


@Component({
    selector: 'capability-users-panel',
    templateUrl: 'capability-users-panel.component.html'
})
export class CapabilityUsersPanelComponent {

	@Input("capability")
	capability : Capability = null;

	@Output()
	userAdded = new EventEmitter();

	@Output()
	userRemoved = new EventEmitter();

	private users : User[] = [];
	private selectedUser : User = null;

	private isLoading = false;


	constructor(
		private modalService : ModalService,
		private notificationsService : NotificationsService,
		private userCapabilityMappingService : UserCapabilityMappingService) {
	}


	ngOnChanges() {
		this.loadCapabilityUsers();
	}


	private loadCapabilityUsers() {
		this.isLoading = true;
		this.selectedUser = null;

		this.userCapabilityMappingService.getUsersByCapability(this.capability.id).subscribe((result) => {
			this.users = result;
		},
		() => {
			this.notificationsService.error("Error", "Could not load users!");
		},
		() => {
			this.isLoading = false;
		});

	}


	intendAdd() {
		let ignore = this.users.map((t) => t.id);
		let modal = this.modalService.create(YawlResourcesDialogsModule, UserSelectDialogComponent, {
				'ignore': ignore,
				'onSelected': (capability) => this.addUser(capability)
			});
		modal.subscribe((ref) => {});
	}


	addUser(user : User) {
		this.userCapabilityMappingService.addUserCapabilityLink(user.id, this.capability.id).subscribe(() => {
			this.loadCapabilityUsers();
			this.userAdded.emit(user);
		},
		(error) => {
			this.notificationsService.error("Could not add user!", error);
		},
		() => {
		});
	}


	removeSelected() {
		let user = this.selectedUser;
		if(!user) {
			return;
		}

		this.userCapabilityMappingService.deleteUserCapabilityLink(user.id, this.capability.id).subscribe(() => {
			this.loadCapabilityUsers();
			this.userRemoved.emit(user);
		},
		(error) => {
			this.notificationsService.error("Could not remove user!", error);
		},
		() => {
		});
	}

}
