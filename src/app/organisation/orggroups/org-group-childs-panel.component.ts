import { Component, Input, Output, EventEmitter } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';

import { OrgGroupService } from '../../yawl/resources/services/org-group.service';
import { OrgGroup } from '../../yawl/resources/entities/org-group.entity';


@Component({
    selector: 'org-group-childs-panel',
    templateUrl: 'org-group-childs-panel.component.html'
})
export class OrgGroupChildsPanelComponent {

	@Input("org-group")
	orgGroup : OrgGroup = null;

	private orgGroups : OrgGroup[] = [];

	private isLoading = false;


	constructor(
		private notificationsService : NotificationsService,
		private orgGroupService : OrgGroupService) {
	}


	ngOnChanges() {
		this.loadItems();
	}


	private loadItems() {
		this.isLoading = true;

		this.orgGroupService.findAll().subscribe((result) => {
			this.orgGroups = result.filter((orgGroup) => {
				return orgGroup.belongsTo == this.orgGroup.id;
			});
		},
		(error) => {
			this.notificationsService.error("Could not load positions!", error);
		},
		() => {
			this.isLoading = false;
		});

	}


}
