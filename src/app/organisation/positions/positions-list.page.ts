import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';

import { DialogsService } from '../../util/dialogs/dialogs.service'

import { PositionService } from '../../yawl/resources/services/position.service';



@Component({
    templateUrl: 'positions-list.page.html'
})
export class PositionsListPage {

	@ViewChild('searchBox')
	searchBox : ElementRef;

	public positions = [];

	public isLoading = false;

	public searchQuery = '';


	constructor(
		private router: Router,
		private notificationsService : NotificationsService,
		private dialogsService : DialogsService,
		private positionService : PositionService) {
	}

	ngOnInit() {
		this.reload();
	}

	ngAfterViewInit() {
        this.searchBox.nativeElement.focus();
    }



	reload() {
		this.isLoading = true;

		this.positionService.findAll().subscribe((result) => {
			this.positions = result;
		},
		(error) => {
			this.notificationsService.error("Could not load positions!", error);
		},
		() => {
			this.isLoading = false;
		});

	}


	openFormForNew() {
		let url = '/position/new';
		this.router.navigate([url]);
	}


	gotoDetailsPage(item) {
		this.router.navigate(['position', item.id]);
	}

}
