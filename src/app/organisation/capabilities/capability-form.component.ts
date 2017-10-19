import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Capability } from '../../yawl/resources/entities/capability.entity';



@Component({
    selector: 'capability-form',
    templateUrl: 'capability-form.component.html'
})
export class CapabilityFormComponent {

	@Input("capability")
	capability : Capability = null;

	@Output("saved")
	saved = new EventEmitter();

	@Output("canceled")
	canceled = new EventEmitter();


	constructor() {
		this.reset();
	}


	reset() {
		this.capability = {
			id: null,
			name: "",
			description: "",
			notes: ""
		};
	}

	save() {
		this.saved.emit(this.capability);
	}


	cancel() {
		this.canceled.emit();
	}

}
