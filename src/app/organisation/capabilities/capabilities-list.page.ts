import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';

import { DialogsService } from '../../util/dialogs/dialogs.service'

import { CapabilityService } from '../../yawl/resources/services/capability.service';



@Component({
    templateUrl: 'capabilities-list.page.html'
})
export class CapabilitiesListPage {

	@ViewChild('searchBox')
	searchBox : ElementRef;

	public capabilities = [];

	public isLoading = false;

	public searchQuery = '';


	constructor(
		private router: Router,
		private notificationsService : NotificationsService,
		private dialogsService : DialogsService,
		private capabilityService : CapabilityService) {
	}

	ngOnInit() {
		this.reload();
	}

	ngAfterViewInit() {
        this.searchBox.nativeElement.focus();
    }


	reload() {
		this.isLoading = true;

		this.capabilityService.findAll().subscribe((loadedCapabilities) => {
			this.capabilities = loadedCapabilities;
		},
		(error) => {
			this.notificationsService.error("Could not load capabilities!", error);
		},
		() => {
			this.isLoading = false;
		});

	}


	openFormForNew() {
		let url = '/capability/new';
		this.router.navigate([url]);
	}


	gotoDetailsPage(item) {
		this.router.navigate(['capability', item.id]);
	}

}
