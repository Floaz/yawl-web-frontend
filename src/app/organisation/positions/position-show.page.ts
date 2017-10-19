import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';

import { DialogsService } from '../../util/dialogs/dialogs.service'

import { PositionService }	from '../../yawl/resources/services/position.service';
import { Position }			from '../../yawl/resources/entities/position.entity';

import { OrgGroupService }	from '../../yawl/resources/services/org-group.service';
import { OrgGroup }			from '../../yawl/resources/entities/org-group.entity';



@Component({
    templateUrl: 'position-show.page.html'
})
export class PositionShowPage {

	private positionId : string;
	private position : Position = null;

	private reportsTo : Position = null;
	private belongsTo : OrgGroup = null;

	private isLoading = true;

	private mode = "details";


	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private notificationsService : NotificationsService,
		private dialogsService : DialogsService,
		private orgGroupService : OrgGroupService,
		private positionService : PositionService) {
	}


    ngOnInit() {
		this.route.params.subscribe(params => {
			if(!params['id']) {
				this.notificationsService.error("Error", "No valid id!");
				this.gotoList();
				return;
			}

			this.positionId = params['id'];
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
		this.positionService.findById(this.positionId).subscribe((result) => {
			this.position = result;
			this.isLoading = false;
			this.loadReportsTo();
			this.loadBelongsTo();
		},
		(error) => {
			this.notificationsService.error("Could not load position", error);
			this.gotoList();
		});
	}


	private loadReportsTo() {
		if(!this.position.reportsTo) {
			return;
		}

		this.positionService.findById(this.position.reportsTo).subscribe((result) => {
			this.reportsTo = result;
		},
		(error) => {
			this.notificationsService.error("Could not load reports to position!", error);
		});
	}


	private loadBelongsTo() {
		if(!this.position.belongsToOrgGroup) {
			return;
		}

		this.orgGroupService.findById(this.position.belongsToOrgGroup).subscribe((result) => {
			this.belongsTo = result;
		},
		(error) => {
			this.notificationsService.error("Could not load belongs to org group!", error);
		});
	}


	setMode(newMode, event) {
		this.gotoPosition(this.position, newMode);
		event.preventDefault();
	}


	gotoPosition(item, mode) {
		let queryParams = {
			'mode': mode
		};
		this.router.navigate(['position', item.id], {queryParams});
	}


	gotoList() {
		this.router.navigate(['positions']);
	}


	intendEdit() {
		this.router.navigate(['position', this.position.id, 'edit']);
	}


	intendRemove() {
		let title = "Delete position";
		let message = "Are you sure you want to delete the position \""+this.position.name+"\"?";
		this.dialogsService.openConfirmationDialog(title, message, () => {
			this.removePosition(this.position);
		});
	}


	removePosition(position) {
		this.positionService.remove(position.id).subscribe(() => {
			this.notificationsService.success("Position deleted", "Position successfully deleted!");
			this.gotoList();
		},
		(error) => {
			this.notificationsService.error("Could not delete position!", error);
		},
		() => {
		});
	}

}
