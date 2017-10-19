import { Component } from '@angular/core';
import { Router } from '@angular/router';


import { NotificationsService } from 'angular2-notifications';
import { SessionService } from './session.service';

@Component({
    selector: 'login-form',
    templateUrl: 'login-form.page.html',
    styleUrls: ['login-form.page.scss']
})
export class LoginFormPage {

	applicationName = "YAWL Web Admin";
	username = "";
	password = "";

	isLoading = false;
	loadingType = "";


	constructor(private sessionService: SessionService,
				private router: Router,
				private notificationsService : NotificationsService) {
	}

	ngOnInit() {
		this.isLoading = true;
		this.loadingType = "session-check";
		this.sessionService.checkLoggedIn(() => {
			this.isLoading = false;
			if(this.sessionService.isLoggedIn()) {
				this.redirect();
			}
		});
	}

	onSubmit() {
		this.isLoading = true;
		this.loadingType = "credentials-check";
		this.sessionService.login(this.username, this.password)
							.subscribe((result) => this.handleLoginResponse(result),
									   (errorMessage) => this.handleLoginError(errorMessage));
		this.password = "";
	}


	private handleLoginResponse(result) {
		this.isLoading = false;
		if(result) {
			this.notificationsService.success("Login successful", "You have been successfully logged in");
			this.redirect();
		} else {
			this.notificationsService.error("Wrong credentials", "The username or password you have entered is invalid.");
		}
	}


	private handleLoginError(errorMessage) {
		this.isLoading = false;
		this.notificationsService.error("Error", errorMessage);
	}


	private redirect() {
		if(!this.sessionService.redirectUrl
			|| this.sessionService.redirectUrl == "login") {
				this.router.navigate(['']);
		} else {
			this.router.navigate([this.sessionService.redirectUrl]);
		}

		this.sessionService.redirectUrl = null;
	}
}
