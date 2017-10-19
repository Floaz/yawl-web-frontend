import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';

import { DialogsService } from '../../util/dialogs/dialogs.service'

import { OrgGroupService }	from '../../yawl/resources/services/org-group.service';
import { OrgGroup }			from '../../yawl/resources/entities/org-group.entity';



@Component({
    templateUrl: 'org-group-show.page.html'
})
export class OrgGroupShowPage {

	private orgGroupId : string;
	private orgGroup : OrgGroup = null;

	private belongsTo : OrgGroup = null;

	private isLoading = true;

	private mode = "details";


	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private notificationsService : NotificationsService,
		private dialogsService : DialogsService,
		private orgGroupService : OrgGroupService) {
	}


    ngOnInit() {
		this.route.params.subscribe(params => {
			if(!params['id']) {
				this.notificationsService.error("Error", "No valid id!");
				this.gotoList();
				return;
			}

			this.orgGroupId = params['id'];
			this.loadData();
		});

		this.route.queryParams.subscribe(queryParams => {
			if(queryParams['mode']) {
				this.mode = queryParams['mode'];
			}
		});
    }


	private loadData() {
		this.isLoading = true;
		this.orgGroupService.findById(this.orgGroupId).subscribe((result) => {
			this.orgGroup = result;
			this.isLoading = false;
			this.loadBelongsTo();
		},
		(error) => {
			this.notificationsService.error("Could not load group", error);
			this.gotoList();
		});
	}


	private loadBelongsTo() {
		if(!this.orgGroup.belongsTo) {
			return;
		}

		this.orgGroupService.findById(this.orgGroup.belongsTo).subscribe((result) => {
			this.belongsTo = result;
		},
		(error) => {
			this.notificationsService.error("Could not load belongs to group!", error);
		});
	}


	setMode(newMode, event) {
		this.gotoOrgGroup(this.orgGroup, newMode);
		event.preventDefault();
	}


	gotoOrgGroup(item, mode) {
		let queryParams = {
			'mode': mode
		};
		this.router.navigate(['group', item.id], {queryParams});
	}


	gotoList() {
		this.router.navigate(['groups']);
	}


	intendEdit() {
		this.router.navigate(['group', this.orgGroup.id, 'edit']);
	}


	intendRemove() {
		let title = "Delete group";
		let message = "Are you sure you want to delete the group \""+this.orgGroup.name+"\"?";
		this.dialogsService.openConfirmationDialog(title, message, () => {
			this.removeOrgGroup(this.orgGroup);
		});
	}


	removeOrgGroup(orgGroup) {
		this.orgGroupService.remove(orgGroup.id).subscribe(() => {
			this.notificationsService.success("Group deleted", "Group successfully deleted!");
			this.gotoList();
		},
		(error) => {
			this.notificationsService.error("Could not delete group!", error);
		},
		() => {
		});
	}

}
