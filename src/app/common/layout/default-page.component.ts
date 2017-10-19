import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';

import { SessionService } from '../session/session.service';

import { DashboardService } from '../../dashboard/dashboard.service';


@Component({
    selector: 'default-page',
    templateUrl: 'default-page.component.html'
})
export class DefaultPageComponent implements OnInit {

	dashboards : any = [];

    private subscription = null;
    
    withDashboardService = false;


	constructor(
		private dashboardService: DashboardService,
		private sessionService: SessionService,
		private router: Router,
		private notificationsService : NotificationsService) { }


	ngOnInit() {
        if(this.withDashboardService) {
            this.subscription = this.dashboardService.dashboardChanged.subscribe(() => {
                this.reload()
            });

            this.reload();
        }
	}


	ngOnDestroy() {
		if(this.subscription) {
			this.subscription.unsubscribe();
		}
	}


	reload() {
		this.dashboardService.getDashboardsOfUser().subscribe((result) => {
				this.dashboards = result.dashboards;
			},
			(error) => {
				this.notificationsService.error("Error", "Could not load dashboards. "+error);
			},
			() => {});
	}


	onLogoutButton() {
		this.sessionService.logout().subscribe(() => {
			this.notificationsService.success("Logout successful", "You have been successfully logged out");
			this.router.navigate(['/login']);
		},
		() => {
			this.notificationsService.error("Logout error", "An error occured while logging out!");
		});
	}

}
