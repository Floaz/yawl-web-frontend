import { Component, Input, Output, EventEmitter } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';

import { ModalService }			from '../../util/modal/modal.service';

import { YawlResourcesDialogsModule }	from '../../yawl/resources/yawl-resources-dialogs.module';
import { UserSelectDialogComponent }	from '../../yawl/resources/dialogs/user-select-dialog.component';

import { UserPositionMappingService } from '../../yawl/resources/services/user-position-mapping.service';
import { Position } from '../../yawl/resources/entities/position.entity';
import { User } from '../../yawl/resources/entities/user.entity';


@Component({
    selector: 'position-users-panel',
    templateUrl: 'position-users-panel.component.html'
})
export class PositionUsersPanelComponent {

	@Input("position")
	position : Position = null;

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
		private userPositionMappingService : UserPositionMappingService) {
	}


	ngOnChanges() {
		this.loadPositionUsers();
	}


	private loadPositionUsers() {
		this.isLoading = true;
		this.selectedUser = null;

		this.userPositionMappingService.getUsersByPosition(this.position.id).subscribe((result) => {
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
				'onSelected': (position) => this.addUser(position)
			});
		modal.subscribe((ref) => {});
	}


	addUser(user : User) {
		this.userPositionMappingService.addUserPositionLink(user.id, this.position.id).subscribe(() => {
			this.loadPositionUsers();
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

		this.userPositionMappingService.deleteUserPositionLink(user.id, this.position.id).subscribe(() => {
			this.loadPositionUsers();
			this.userRemoved.emit(user);
		},
		(error) => {
			this.notificationsService.error("Could not remove user!", error);
		},
		() => {
		});
	}

}
