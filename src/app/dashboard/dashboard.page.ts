import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PopupMenuService } from '../util/popup-menu.service';

import { NotificationsService } from 'angular2-notifications';

import { DashboardService } from './dashboard.service';

import { FixedColumnLayoutComponent } from './layout/fixed-column-layout.component';



@Component({
    selector: 'dashboard-page',
    templateUrl: 'dashboard.page.html'
})
export class DashboardPage {

	@ViewChild(FixedColumnLayoutComponent)
	fixedColumnLayoutComponent : FixedColumnLayoutComponent

	dashboardData : any;

	isLoading = false;

	constructor(
		private dashboardService: DashboardService,
		private popupMenuService : PopupMenuService,
		private notificationsService : NotificationsService,
		private route: ActivatedRoute,
		private router: Router) {
	}


    ngOnInit() {
		this.route.params.subscribe(params => {
			this.isLoading = true;

			if(!params['id']) {
				this.dashboardService.getDashboardsOfUser().subscribe((result) => {
						this.dashboardData = result.dashboards[0];
					},
					(error) => {
						this.notificationsService.error("Error", "Could not load dashboard!");
					},
					() => {
						this.isLoading = false;
					});
			} else {
				this.dashboardService.getDashboardById(params['id']).subscribe((result) => {
						this.dashboardData = result;
					},
					(error) => {
						this.notificationsService.error("Error", "Could not load dashboard!");
					},
					() => {
						this.isLoading = false;
					});
			}
		});
    }


	public onSettingsButton($event: MouseEvent, item: any): void {
		this.popupMenuService.show.next({
			menuItems: [
				{
					html: () => 'Refresh Dashboard',
					click: (item) => this.fixedColumnLayoutComponent.reload()
				},
				{
					html: () => 'Manage Dashlets',
					click: (item) => this.fixedColumnLayoutComponent.startEditMode()
				},
				{
					html: () => 'Change columns',
					click: (item) => this.fixedColumnLayoutComponent.startLayoutChangeMode()
				},
				{
					html: () => 'Manage Dashboards',
					click: (item) => this.navigateToDashboardList()
				}
			],
			event: $event,
			item: item,
		});
		$event.preventDefault();
	}


	navigateToSettings() {
		if(!this.dashboardData) {
			return;
		}
		let url = '/dashboard/'+this.dashboardData.id+'/settings';
		this.router.navigate([url]);
	}

	navigateToDashboardList() {
		let url = '/manage/dashboards';
		this.router.navigate([url]);
	}

}
