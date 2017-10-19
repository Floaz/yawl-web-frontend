import { Component, Input, Output, EventEmitter } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';

import { DashletTypeService } from './dashlet-type.service';
import { DashletService } from './dashlet.service';



@Component({
    selector: 'dashlet-add-panel',
    templateUrl: 'dashlet-add-panel.component.html'
})
export class DashletAddPanelComponent {

	@Input("dashboard")
	dashboardId : string;

	@Output()
	added : EventEmitter<any> = new EventEmitter();

	dashlets = [];

	newDashlet : any = {};
	dashletTypes = [];

	isLoading = false;


	constructor(
		private dashletService: DashletService,
		private dashletTypeService: DashletTypeService,
		private notificationsService : NotificationsService) {
	}

	ngOnInit() {
		this.dashletTypes = this.dashletTypeService.getAllDashletTypes();
	}


	saveNewDashlet() {
		let title = this.newDashlet.title;
		let dashletType = this.newDashlet.type;

		if(!title || title.trim() == "") {
			return;
		}

		if(!dashletType) {
			return;
		}

		this.isLoading = true;
		this.dashletService.addDashlet(this.dashboardId, title.trim(), dashletType).subscribe((result) => {
				this.newDashlet = {};
				this.notificationsService.success("Dashlet added", "You successfully added a new dashlet instance to the dashboard");
				this.added.emit(result.id);
			},
			(error) => {
				this.notificationsService.error("Error", error);
			},
			() => {
				this.isLoading = false;
			});
	}

}
