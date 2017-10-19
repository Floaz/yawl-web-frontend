import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';

import { DialogsService } from '../../util/dialogs/dialogs.service'

import { CapabilityService }	from '../../yawl/resources/services/capability.service';
import { Capability }			from '../../yawl/resources/entities/capability.entity';



@Component({
    templateUrl: 'capability-show.page.html'
})
export class CapabilityShowPage {

	private capabilityId : string;
	private capability : Capability = null;

	private isLoading = true;

	private mode = "details";


	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private notificationsService : NotificationsService,
		private dialogsService : DialogsService,
		private capabilityService : CapabilityService) {
	}


    ngOnInit() {
		this.route.params.subscribe(params => {
			if(!params['id']) {
				this.notificationsService.error("Error", "No valid id!");
				this.gotoList();
				return;
			}

			this.capabilityId = params['id'];
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
		this.capabilityService.findById(this.capabilityId).subscribe((result) => {
			this.capability = result;
			this.isLoading = false;
		},
		(error) => {
			this.notificationsService.error("Could not load capability", error);
			this.gotoList();
		});
	}


	setMode(newMode, event) {
		this.gotoCapability(this.capability, newMode);
		event.preventDefault();
	}


	gotoCapability(item, mode) {
		let queryParams = {
			'mode': mode
		};
		this.router.navigate(['capability', item.id], {queryParams});
	}


	gotoList() {
		this.router.navigate(['capabilities']);
	}


	intendEdit() {
		this.router.navigate(['capability', this.capability.id, 'edit']);
	}


	intendRemove() {
		let title = "Delete capability";
		let message = "Are you sure you want to delete the capability \""+this.capability.name+"\"?";
		this.dialogsService.openConfirmationDialog(title, message, () => {
			this.removeCapability(this.capability);
		});
	}


	removeCapability(capability) {
		this.capabilityService.remove(capability.id).subscribe(() => {
			this.notificationsService.success("Capability deleted", "Capability successfully deleted!");
			this.gotoList();
		},
		(error) => {
			this.notificationsService.error("Could not delete capability!", error);
		},
		() => {
		});
	}

}
