import { Component, Input } from '@angular/core';



@Component({
    selector: 'participants-table-dashlet-settings',
    templateUrl: 'participants-table-dashlet-settings.component.html'
})
export class ParticipantsTableDashletSettingsComponent {

	dashletId : String;

	settings : any = {};

}
