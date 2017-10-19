import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Position } from '../../yawl/resources/entities/position.entity';



@Component({
    selector: 'position-form',
    templateUrl: 'position-form.component.html'
})
export class PositionFormComponent {

	@Input("position")
	position : Position = null;

	@Output("saved")
	saved = new EventEmitter();

	@Output("canceled")
	canceled = new EventEmitter();

	ignoredPositions : string[] = [];


	constructor() {
		this.reset();
	}


	ngOnChanges() {
		if(this.position && this.position.id) {
			this.ignoredPositions = [this.position.id];
		}
	}


	reset() {
		this.position = {
			id: null,
			name: "",
			description: "",
			notes: "",
			belongsToOrgGroup: null,
			reportsTo: null
		};
	}

	save() {
		this.saved.emit(this.position);
	}


	cancel() {
		this.canceled.emit();
	}

}
