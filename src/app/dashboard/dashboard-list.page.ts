import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';

import { DashboardService } from './dashboard.service';



@Component({
    templateUrl: 'dashboard-list.page.html'
})
export class DashboardListPage {

	dashboards = [];

	isLoading = false;

	showDashboardForm = false;
	dashboard : any = {};
	dashboardFormMode = 'new';


	constructor(
		private dashboardService: DashboardService,
		private router: Router,
		private notificationsService : NotificationsService) {
	}

	ngOnInit() {
		this.reload();
	}


	reload() {
		this.isLoading = true;

		this.dashboardService.getDashboardsOfUser().subscribe((result) => {
				this.dashboards = result.dashboards;
			},
			(error) => {},
			() => {
				this.isLoading = false;
			});
	}


	saveNewDashboard() {
		let title = this.dashboard.title;

		if(!title || title.trim() == "") {
			return;
		}

		this.isLoading = true;
		if(this.dashboardFormMode == 'new') {
			this.dashboardService.addDashboard(title.trim()).subscribe((result) => {
					this.reload();
					this.showDashboardForm = false;
					this.notificationsService.success("Dashboard added", "You successfully created a new dashboard");
				},
				(error) => {
					this.notificationsService.error("Error", error);
				},
				() => {
					this.isLoading = false;
				});
		} else {
			this.dashboardService.renameDashboard(this.dashboard.id, title.trim()).subscribe((result) => {
					this.reload();
					this.showDashboardForm = false;
					this.notificationsService.success("Dashboard renamed", "You successfully renamed the dashboard");
				},
				(error) => {
					this.notificationsService.error("Error", error);
				},
				() => {
					this.isLoading = false;
				});
		}
	}


	gotoDashboard(item) {
		let url = '/dashboard/'+item.id;
		this.router.navigate([url]);
	}


	editDashboard(item) {
		this.dashboard = Object.create(item);
		this.showDashboardForm = true;
		this.dashboardFormMode = 'edit';
	}


	moveUp(item) {
		this.moveTo(item, -1);
	}


	moveDown(item) {
		this.moveTo(item, 1);
	}


	moveTo(item, direction : number) {
		this.dashboardService.changeOrderNo(item.id, item.orderNo+direction).subscribe((result) => {
				this.reload();
				this.showDashboardForm = false;
				this.notificationsService.success("Dashboard moved", "You successfully moved the dashboard in the list");
			},
			(error) => {
				this.notificationsService.error("Error", error);
			},
			() => {
				this.isLoading = false;
			});
	}


	getMaxOrderNo() : number {
		let max = 0;
		for(let entry of this.dashboards) {
			if(max < entry.orderNo) {
				max = entry.orderNo;
			}
		}
		return max;
	}


	openDashboardFormForNew() {
		this.dashboard = {};
		this.showDashboardForm = true;
		this.dashboardFormMode = 'new';
	}

	closeDashboardForm() {
		this.showDashboardForm = false;
	}


	gotoDashboardSettings(item) {
		let url = '/dashboard/'+item.id+'/settings';
		this.router.navigate([url]);
	}


	removeDashboard(item) {
		this.isLoading = true;
		this.dashboardService.removeDashboard(item.id).subscribe((result) => {
				this.reload();
				this.notificationsService.success("Dashboard removed", "You successfully deleted a dashboard");
			},
			(error) => {
				this.notificationsService.error("Error", error);
			},
			() => {
				this.isLoading = false;
			});
	}

}
