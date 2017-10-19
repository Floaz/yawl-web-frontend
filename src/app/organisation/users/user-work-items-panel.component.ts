import { Component, Input, Output, EventEmitter } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';

import { ModalService }			from '../../util/modal/modal.service';

import { YawlResourcesDialogsModule }	from '../../yawl/resources/yawl-resources-dialogs.module';
import { PositionSelectDialogComponent }	from '../../yawl/resources/dialogs/position-select-dialog.component';

import { WorkItemService } from '../../yawl/resources/services/work-item.service';
import { WorkItem } from '../../yawl/resources/entities/work-item.entity';
import { User } from '../../yawl/resources/entities/user.entity';


@Component({
    selector: 'user-work-items-panel',
    templateUrl: 'user-work-items-panel.component.html'
})
export class UserWorkItemsPanelComponent {

	@Input("user")
	user : User = null;

	private workItems : WorkItem[] = [];

	private isLoading = false;

	private queue = 0;


	constructor(
		private modalService : ModalService,
		private notificationsService : NotificationsService,
		private workItemService : WorkItemService) {
	}


	ngOnChanges() {
		this.loadData();
	}


	setQueue(queue : number) {
		this.queue = queue;
		this.loadData();
	}

	queueIndexToQueue(queue : number) : string {
		if(queue == 0) {
            return "offered";
        }
		else if(queue == 1) {
            return "allocated";
        }
		else if(queue == 2) {
            return "started";
        }
		else if(queue == 3) {
            return "suspended";
        }
		return "";
	}


	private loadData() {
		this.isLoading = true;

		this.workItemService.findByUser(this.user.id, this.queueIndexToQueue(this.queue)).subscribe((workItems) => {
			this.workItems = workItems;
		},
		(error) => {
			this.notificationsService.error("Could not load work items", error);
		},
		() => {
			this.isLoading = false;
		});

	}

}
