import { Component } from '@angular/core';

import { DashletService } from '../../dashlet.service';


@Component({
    selector: 'notifications-dashlet',
    templateUrl: 'notifications.dashlet.html'
})
export class NotificationsDashlet {

	dashletId : string;

	settings : any = {};

	isLoading = false;

	dashletHeight = 384;


	constructor(private dashletService: DashletService) {}


	onDashletCreated() {
		this.reload();
	}


	reload() {
		this.loadSettings(() => {
			if(this.settings.dashletHeight) {
				this.dashletHeight = this.settings.dashletHeight;
			}
		});
	}


	loadSettings(callback : any) {
		if(!this.dashletId) {
			return;
		}

		this.isLoading = true;
		this.dashletService.loadSettings(this.dashletId)
					.subscribe(
						(res : any) => {
							this.settings = res;
							callback && callback();
						},
						(error) => {
						},
						() => {
							this.isLoading = false;
						});
	}


	get css(): any {
		return {
			'height': this.settings.dashletHeight + 'px',
			'overflow-y': 'scroll'
		};
	}

}
