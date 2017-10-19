import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';

import { OrgGroupService } from '../../yawl/resources/services/org-group.service';
import { OrgGroup } from '../../yawl/resources/entities/org-group.entity';



@Component({
    templateUrl: 'org-group-edit.page.html'
})
export class OrgGroupEditPage {

	private id : string;
	public orgGroup : OrgGroup;

	public isLoading = true;


	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private notificationsService : NotificationsService,
		private orgGroupService : OrgGroupService) {
	}


    ngOnInit() {
		this.route.params.subscribe(params => {
			if(!params['id']) {
				this.notificationsService.error("Error", "No valid id!");
				return;
			}

			this.id = params['id'];
			this.load();
		});
    }


	public load() {
		this.isLoading = true;
		this.orgGroupService.findById(this.id).subscribe((result) => {
			this.orgGroup = result;
			this.isLoading = false;
		},
		(error) => {
			this.notificationsService.error("Error", "Could not load group: "+error);
		});
	}


	public save() {
		this.orgGroupService.update(this.orgGroup.id, this.orgGroup).subscribe(() => {
			this.notificationsService.success("Group saved", "The group was edited.");
			this.gotoOrgGroupPage();
		},
		(error) => {
			this.notificationsService.error("Error", "Could not edit group: "+error);
		});
	}


	public cancel() {
		this.gotoOrgGroupPage();
	}


	private gotoOrgGroupPage() {
		this.router.navigate(['group', this.orgGroup.id]);
	}

	private gotoOrgGroupsPage() {
		this.router.navigate(['groups']);
	}

}
