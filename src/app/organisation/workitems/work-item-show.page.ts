import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';

import { ModalService }			from '../../util/modal/modal.service';

import { YawlResourcesDialogsModule }	from '../../yawl/resources/yawl-resources-dialogs.module';
import { UserSelectDialogComponent }	from '../../yawl/resources/dialogs/user-select-dialog.component';

import { DialogsService } from '../../util/dialogs/dialogs.service'

import { WorkItemService } from '../../yawl/resources/services/work-item.service';
import { WorkItem }			from '../../yawl/resources/entities/work-item.entity';

import { UserService } from '../../yawl/resources/services/user.service';
import { User } from '../../yawl/resources/entities/user.entity';



@Component({
    templateUrl: 'work-item-show.page.html'
})
export class WorkItemShowPage {

	private workItemId : string;
	private workItem : WorkItem = null;

	private isLoading = true;

	private mode = "details";


	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private notificationsService : NotificationsService,
		private modalService : ModalService,
		private dialogsService : DialogsService,
		private workItemService : WorkItemService) {
	}


    ngOnInit() {
		this.route.params.subscribe(params => {
			if(!params['id']) {
				this.notificationsService.error("Error", "No valid id!");
				this.gotoList();
				return;
			}

			this.workItemId = params['id'];
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
		this.workItemService.findById(this.workItemId).subscribe((result) => {
			this.workItem = result;
			this.isLoading = false;
		},
		(error) => {
			this.notificationsService.error("Could not load work item", error);
			this.gotoList();
		});
	}


	setMode(newMode, event) {
		this.gotoWorkItem(this.workItem, newMode);
		event.preventDefault();
	}


	gotoWorkItem(item, mode) {
		let url = '/workitem/'+item.id;
		let queryParams = {
			'mode': mode
		};
		this.router.navigate([url], {queryParams});
	}


	gotoList() {
		let url = '/workitems';
		this.router.navigate([url]);
	}


	intendEditDocumentation() {
		this.router.navigate(['workitem', this.workItem.id, 'editdocumentation']);
	}


	intendReoffer() {
		this.router.navigate(['workitem', this.workItem.id, 'reoffer']);
	}


	intendReallocate() {
		let modal = this.modalService.create(YawlResourcesDialogsModule, UserSelectDialogComponent, {
				'onSelected': (user) => this.reallocateWorkItem(user),
				'showNoSelectionButton': false
			});
		modal.subscribe((ref) => {});
	}


	reallocateWorkItem(user) {
		if(user == null) {
			return;
		}
		this.workItemService.reallocateWorkItem(this.workItem.id, user.id).subscribe((result) => {
			this.notificationsService.success("Work Item reallocated", "The work item was reallocated with participant \""+user.username+"\"!");
			this.loadData();
		},
		(error) => {
			this.notificationsService.error("Could not reallocate work item", error);
		});
	}


	intendRestart() {
		let modal = this.modalService.create(YawlResourcesDialogsModule, UserSelectDialogComponent, {
				'onSelected': (user) => this.restartWorkItem(user),
				'showNoSelectionButton': false
			});
		modal.subscribe((ref) => {});
	}


	restartWorkItem(user) {
		if(user == null) {
			return;
		}
		this.workItemService.restartWorkItem(this.workItem.id, user.id).subscribe((result) => {
			this.notificationsService.success("Work Item restarted", "The work item was restarted with participant \""+user.username+"\"!");
			this.gotoList();
		},
		(error) => {
			this.notificationsService.error("Could not restart work item", error);
		});
	}

}
