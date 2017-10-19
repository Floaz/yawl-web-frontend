import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';
import { UserService } from '../../yawl/resources/services/user.service';

import { User } from '../../yawl/resources/entities/user.entity';



@Component({
    templateUrl: 'user-edit.page.html'
})
export class UserEditPage {

	private userId : string;
	public user : User;

	public isLoading = true;


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
		});
	}


	public save() {
		this.userService.update(this.user).subscribe(() => {
			this.notificationsService.success("User saved", "The user was edited.");
			this.gotoUserPage();
		},
		(error) => {
			this.notificationsService.error("Error", "Could not edit user: "+error);
		});
	}


	public cancel() {
		this.gotoUserPage();
	}


	private gotoUserPage() {
		let url = '/user/'+this.userId;
		this.router.navigate([url]);
	}

}
