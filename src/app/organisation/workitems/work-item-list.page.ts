import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';

import { DialogsService } from '../../util/dialogs/dialogs.service'

import { WorkItemService } from '../../yawl/resources/services/work-item.service';
import { WorkItem }			from '../../yawl/resources/entities/work-item.entity';



@Component({
    templateUrl: 'work-item-list.page.html'
})
export class WorkItemListPage {

	@ViewChild('searchBox')
	private searchBox : ElementRef;

	private workItems : WorkItem[] = [];

	private isLoading = false;

	private searchQuery = '';

	private queue = 0;


	constructor(
		private router: Router,
		private notificationsService : NotificationsService,
		private dialogsService : DialogsService,
		private workItemService : WorkItemService) {
	}

	ngOnInit() {
		this.loadData();
	}

	ngAfterViewInit() {
        this.searchBox.nativeElement.focus();
    }


	setQueue(queue : number) {
		this.queue = queue;
		this.loadData();
	}


	loadData() {
		this.isLoading = true;

		this.workItemService.findAll().subscribe((workItems) => {
			this.workItems = workItems.filter((item) => this.filter(item));
		},
		() => {
			this.notificationsService.error("Error", "Could not load workitems!");
		},
		() => {
			this.isLoading = false;
		});

	}


	filter(item) {
		if(this.queue == 0) {
			return true;
		}
		else if(this.queue == 1) {
			return item.resourceStatus == "Unoffered";
		}
		else if(this.queue == 2) {
			return item.resourceStatus == "Offered"
					|| item.resourceStatus == "Allocated"
					|| item.resourceStatus == "Started"
					|| item.resourceStatus == "Suspended";
		}
		else if(this.queue == 3) {
			return item.resourceStatus == "Offered";
		}
		else if(this.queue == 4) {
			return item.resourceStatus == "Allocated";
		}
		else if(this.queue == 5) {
			return item.resourceStatus == "Started";
		}
		else if(this.queue == 6) {
			return item.resourceStatus == "Suspended";
		}
	}


	showItem(item) {
		this.router.navigate(['workitem', item.id]);
	}

}
