import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';

import { OrgGroupService } from '../../yawl/resources/services/org-group.service';
import { OrgGroup } from '../../yawl/resources/entities/org-group.entity';



@Component({
    templateUrl: 'org-group-add.page.html'
})
export class OrgGroupAddPage {

	constructor(
		private router: Router,
		private notificationsService : NotificationsService,
		private orgGroupService : OrgGroupService) {
	}


	save(orgGroup : OrgGroup) {
		this.orgGroupService.save(orgGroup).subscribe((result) => {
			this.gotoOrgGroupPage(result.id);
			this.notificationsService.success("Group saved", "The new group was added.");
		},
		(error) => {
			this.notificationsService.error("Error", "Could not add group: "+error);
		})
	}


	gotoOrgGroupPage(id : string) {
		let url = '/group/'+id;
		this.router.navigate([url]);
	}


	cancel() {
		let url = '/groups';
		this.router.navigate([url]);
	}

}
