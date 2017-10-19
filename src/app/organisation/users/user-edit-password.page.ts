import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';
import { UserService } from '../../yawl/resources/services/user.service';

import { User } from '../../yawl/resources/entities/user.entity';



@Component({
    templateUrl: 'user-edit-password.page.html'
})
export class UserEditPasswordPage {

	private userId : string;
	private user : User;

	private isLoading = true;

	private password1 = '';
	private password2 = '';


	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private notificationsService : NotificationsService,
		private userService : UserService) {
	}


    ngOnInit() {
		this.route.params.subscribe(params => {
			if(!params['id']) {
				this.notificationsService.error("Error", "No valid id!");
				return;
			}

			this.userId = params['id'];
			this.loadUser();
		});
    }


	public loadUser() {
		this.isLoading = true;
		this.userService.findById(this.userId).subscribe((result) => {
			this.user = result;
			this.isLoading = false;
		},
		(error) => {
			this.notificationsService.error("Error", "Could not load user: "+error);
			this.gotoUserPage();
		});
	}


	public save() {
		if(this.password1 != this.password2) {
			this.notificationsService.error("Password fields are not equal", "Passwords do not match!");
			return;
		}

		this.userService.updatePassword(this.user.id, this.password1).subscribe(() => {
			this.notificationsService.success("Password changed", "The password was changed for user \""+this.user.username+"\".");
			this.gotoUserPage();
		},
		(error) => {
			this.notificationsService.error("Could not change password", error);
		});
	}


	public cancel() {
		this.gotoUserPage();
	}


	private gotoUserPage() {
		this.router.navigate(['user', this.userId]);
	}

}
