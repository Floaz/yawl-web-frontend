import { Component, Output, EventEmitter } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';
import { UserService } from '../../yawl/resources/services/user.service';

import { User } from '../../yawl/resources/entities/user.entity';



@Component({
    selector: 'user-add-form',
    templateUrl: 'user-add-form.component.html'
})
export class UserAddFormComponent {

	@Output("added")
	added = new EventEmitter();

	@Output("canceled")
	canceled = new EventEmitter();

	public user : User;


	constructor(
		private notificationsService : NotificationsService,
		private userService : UserService) {
		this.reset();
	}


	reset() {
		this.user = {
			username: "",
			firstname: "",
			lastname: "",
			description: "",
			notes: ""
		};
	}


	save() {
		this.userService.save(this.user).subscribe((result) => {
			this.user.id = result.id;
			this.added.emit(this.user);
			this.notificationsService.success("User saved", "The new user was added.");
		},
		(error) => {
			this.notificationsService.error("Error", "Could not add user: "+error);
		})
	}


	cancel() {
		this.canceled.emit();
	}

}
