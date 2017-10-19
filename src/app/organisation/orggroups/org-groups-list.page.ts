import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';

import { OrgGroupService } from '../../yawl/resources/services/org-group.service';



@Component({
    templateUrl: 'org-groups-list.page.html'
})
export class OrgGroupsListPage {

	@ViewChild('searchBox')
	searchBox : ElementRef;

	public orgGroups = [];

	public isLoading = false;

	public searchQuery = '';


	constructor(
		private router: Router,
		private notificationsService : NotificationsService,
		private orgGroupService : OrgGroupService) {
	}

	ngOnInit() {
		this.reload();
	}

	ngAfterViewInit() {
        this.searchBox.nativeElement.focus();
    }


	reload() {
		this.isLoading = true;

		this.orgGroupService.findAll().subscribe((loadedOrgGroups) => {
			this.orgGroups = loadedOrgGroups;
		},
		() => {
			this.notificationsService.error("Error", "Could not load groups!");
		},
		() => {
			this.isLoading = false;
		});

	}


	openFormForNew() {
		let url = '/group/new';
		this.router.navigate([url]);
	}


	gotoDetailsPage(item) {
		this.router.navigate(['group', item.id]);
	}

}
