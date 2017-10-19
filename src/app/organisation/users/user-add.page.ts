import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';

import { User } from '../../yawl/resources/entities/user.entity';



@Component({
    templateUrl: 'user-add.page.html'
})
export class UserAddPage {

	constructor(
		private router: Router) {
	}


	onUserAdded(user : User) {
		let url = '/user/'+user.id;
		this.router.navigate([url]);
	}


	onCancel() {
		let url = '/users';
		this.router.navigate([url]);
	}

}
