import { Component, Input } from '@angular/core';



@Component({
    selector: 'notifications-dashlet-settings',
    templateUrl: 'notifications-dashlet-settings.component.html'
})
export class NotificationsDashletSettingsComponent {

	dashletId : String;

	settings : any = {};


	constructor() {
	}

	ngOnInit() {
	}

}
