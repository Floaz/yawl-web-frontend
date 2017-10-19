import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';



@Component({
    selector: 'user-details',
    templateUrl: 'user-details.component.html'
})
export class UserDetailsComponent {

	users = [];

	isLoading = false;

	detailsMode = "profile";


	constructor(
		private router: Router,
		private notificationsService : NotificationsService) {
	}

	ngOnInit() {
		this.reload();
	}


	reload() {
		//this.isLoading = true;
	}


	setDetailsMode(newMode, event) {
		this.detailsMode = newMode;
		event.preventDefault();
	}


	gotoUser(item) {
		let url = '/user/'+item.id;
		this.router.navigate([url]);
	}


	editUser(item) {
		let url = '/user/'+item.id+'/edit';
		this.router.navigate([url]);
	}


	openDashboardFormForNew() {
		let url = '/user/new';
		this.router.navigate([url]);
	}


	removeUser(item) {
		var idx = this.users.indexOf(item);
		if(idx != -1) {
			return this.users.splice(idx, 1);
		}
	}

}
