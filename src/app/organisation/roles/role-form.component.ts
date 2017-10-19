import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Role } from '../../yawl/resources/entities/role.entity';



@Component({
    selector: 'role-form',
    templateUrl: 'role-form.component.html'
})
export class RoleFormComponent {

	@Input("role")
	role : Role = null;

	@Output("saved")
	saved = new EventEmitter();

	@Output("canceled")
	canceled = new EventEmitter();

	ignoredRoles : string[] = [];


	constructor() {
		this.reset();
	}


	ngOnChanges() {
		if(this.role && this.role.id) {
			this.ignoredRoles = [this.role.id];
		}
	}


	reset() {
		this.role = {
			id: null,
			name: "",
			description: "",
			notes: "",
			belongsTo: null
		};
	}

	save() {
		this.saved.emit(this.role);
	}


	cancel() {
		this.canceled.emit();
	}

}
