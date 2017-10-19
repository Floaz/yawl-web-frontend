import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';

import { PositionService } from '../../yawl/resources/services/position.service';
import { Position } from '../../yawl/resources/entities/position.entity';



@Component({
    templateUrl: 'position-edit.page.html'
})
export class PositionEditPage {

	private id : string;
	public position : Position;

	public isLoading = true;


	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private notificationsService : NotificationsService,
		private positionService : PositionService) {
	}


    ngOnInit() {
		this.route.params.subscribe(params => {
			if(!params['id']) {
				this.notificationsService.error("Error", "No valid id!");
				return;
			}

			this.id = params['id'];
			this.load();
		});
    }


	public load() {
		this.isLoading = true;
		this.positionService.findById(this.id).subscribe((result) => {
			this.position = result;
			this.isLoading = false;
		},
		(error) => {
			this.notificationsService.error("Error", "Could not load position: "+error);
		});
	}


	public save() {
		this.positionService.update(this.position.id, this.position).subscribe(() => {
			this.notificationsService.success("Position saved", "The position was edited.");
			this.gotoPositionPage();
		},
		(error) => {
			this.notificationsService.error("Error", "Could not edit position: "+error);
		});
	}


	public cancel() {
		this.gotoPositionPage();
	}


	private gotoPositionPage() {
		this.router.navigate(['position', this.position.id]);
	}

}
