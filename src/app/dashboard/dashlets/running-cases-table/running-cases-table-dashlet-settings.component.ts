import { Component, Input } from '@angular/core';



@Component({
    templateUrl: 'running-cases-table-dashlet-settings.component.html'
})
export class RunningCasesTableDashletSettingsComponent {

	dashletId : String;

	settings : any = {};


	constructor() {
	}

	ngOnInit() {
	}

	blacklistedSpecificationsUpdated(specifications) {
		this.settings.blacklistedSpecifications = specifications;
	}

	whitelistedSpecificationsUpdated(specifications) {
		this.settings.whitelistedSpecifications = specifications;
	}
}
