import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';



@Component({
    selector: 'user-profile-form',
    templateUrl: 'user-profile-form.component.html'
})
export class UserProfileFormComponent {

	username = "";
	lastname = "";
	firstname = "";


	constructor(
		private router: Router,
		private notificationsService : NotificationsService) {
	}


	ngOnInit() {
		this.reload();
	}


	reload() {
	}


	save() {
	}

}
