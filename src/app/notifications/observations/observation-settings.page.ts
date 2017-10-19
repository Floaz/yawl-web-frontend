import { Component, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';


import { Observer } from './observer';
import { ObserverRegistry } from './observer-registry.service';
import { ObservationService } from './observation.service';



@Component({
    selector: 'observation-settings-page',
    templateUrl: 'observation-settings.page.html'
})
export class ObservationSettingsPage {

	@ViewChild('settingsChild',  {read: ViewContainerRef})
	private settingsChild : ViewContainerRef;

	observationId : string
	observationData : any = {};
	settings = {};

	isLoading = false;


	constructor(
		private observationService : ObservationService,
		private observerRegistry : ObserverRegistry,
		private notificationsService : NotificationsService,
        private componentFactoryResolver: ComponentFactoryResolver,
		private route: ActivatedRoute,
		private router: Router) {
	}


    ngOnInit() {
		this.isLoading = true;
		this.route.params.subscribe(params => {
			this.observationId = params['id'];

			this.observationService.getObservationById(this.observationId).subscribe((result) => {
				this.observationData = result;
				this.settings = this.observationData.settings;

				let observer = this.observerRegistry.getObserver(this.observationData.type);
				this.loadSettingsPanel(observer);

				this.isLoading = false;
			});
		});
    }


	loadSettingsPanel(observer : Observer) {
		let componentType = observer.settingsComponent;
        let component = this.componentFactoryResolver.resolveComponentFactory(componentType);
        let compRef : ComponentRef<any> = this.settingsChild.createComponent(component);
        compRef.instance.settings = this.settings;
        if(compRef.instance.onPanelCreated) {
            compRef.instance.onPanelCreated();
        }
	}


	saveSettings() {
		this.isLoading = true;

		if(!this.observationData.title) {
			let observer = this.observerRegistry.getObserver(this.observationData.type);
			this.observationData.title = observer.displayName;
		}

		this.observationService.editObservation(this.observationData).subscribe((result) => {
			this.notificationsService.success("Observation edited", "You successfully change the settings");
			let url = 'observations';
			this.router.navigate([url]);
		},
		(error) => {
			this.notificationsService.error("Error", error);
			this.isLoading = false;
		},
		() => {
			this.isLoading = false;
		});

	}


	navigateToObservationListPage() {
		let url = 'observations';
		this.router.navigate([url]);
	}

}
