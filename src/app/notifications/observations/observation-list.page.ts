import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';


import { Observer } from './observer';
import { ObserverRegistry } from './observer-registry.service';
import { ObservationService } from './observation.service';




@Component({
    selector: 'observation-list-page',
    templateUrl: 'observation-list.page.html'
})
export class ObservationListPage {

	observations = [];

	isLoading = false;


	constructor(
		private observationService : ObservationService,
		private observerRegistry : ObserverRegistry,
		private notificationsService : NotificationsService,
		private router : Router) {
	}


    ngOnInit() {
		this.loadData();
    }


	loadData() {
		this.isLoading = true;
		this.observationService.getAllObservations().subscribe((result) => {
			this.observations = result.observations.sort((n1,n2) => {
				if(n1.title > n2.title) {
					return 1;
				}
				if(n1.title < n2.title) {
					return -1;
				}
				return 0;
			});
		},
		(error) => {
			this.notificationsService.error("Error", "Could not load list! "+error);
			this.isLoading = false;
		},
		() => {
			this.isLoading = false;
		});
	}


	mapTypeToDisplayName = (key : string) => {
		let result = this.observerRegistry.getObserver(key);
		if(!result) return key;
		return result.displayName;
	}


	navigateToNewObservationPage() {
		let url = 'observations/new';
		this.router.navigate([url]);
	}


	navigateToObservationSettings(item) {
		let url = 'observation/'+item.id+'/settings';
		this.router.navigate([url]);
	}


	removeObservation(item) {
		this.isLoading = true;
		this.observationService.removeObservation(item.id).subscribe(() => {
			this.notificationsService.success("Observation removed", "You successfully removed a observation");
			this.loadData();
		},
		(error) => {
			this.notificationsService.error("Error", "Could not remove observation! "+error);
			this.isLoading = false;
		},
		() => {
			this.isLoading = false;
		});
	}

}
