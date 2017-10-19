import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';

import { WorkItemService } from '../../yawl/resources/services/work-item.service';
import { WorkItem } from '../../yawl/resources/entities/work-item.entity';



@Component({
    templateUrl: 'work-item-edit-documentation.page.html'
})
export class WorkItemEditDocumentationPage {

	private workItemId : string;
	private workItem : WorkItem;

	private isLoading = true;


	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private notificationsService : NotificationsService,
		private workItemService : WorkItemService) {
	}


    ngOnInit() {
		this.route.params.subscribe(params => {
			if(!params['id']) {
				this.notificationsService.error("Error", "No valid work item id!");
				this.gotoDetailsPage();
				return;
			}

			this.workItemId = params['id'];
			this.loadData();
		});
    }


	public loadData() {
		this.isLoading = true;
		this.workItemService.findById(this.workItemId).subscribe((result) => {
			this.workItem = result;
			this.isLoading = false;
		},
		(error) => {
			this.notificationsService.error("Error", "Could not load work item: "+error);
			this.gotoDetailsPage();
		});
	}


	public save() {
		this.workItemService.updateDocumentation(this.workItem.id, this.workItem.documentation).subscribe(() => {
			this.notificationsService.success("Documentation saved", "Documentation of work item successfully edited.");
			this.gotoDetailsPage();
		},
		(error) => {
			this.notificationsService.error("Could not edit documentation", error);
		});
	}


	public cancel() {
		this.gotoDetailsPage();
	}


	private gotoDetailsPage() {
		this.router.navigate(['workitem', this.workItemId]);
	}

}
