import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ModalService }			from '../../../util/modal/modal.service';

import { YawlResourcesDialogsModule }	from '../yawl-resources-dialogs.module';
import { RoleSelectDialogComponent }	from '../dialogs/role-select-dialog.component';

import { RoleService }			from '../services/role.service';
import { Role }					from '../entities/role.entity';


@Component({
    selector: 'role-select',
    templateUrl: 'role-select-input.component.html'
})
export class RoleSelectInputComponent {

	@Input("role")
	public role : string = null;

	@Input("ignore")
	public ignore : string[] = [];

	@Output()
	roleChanged = new EventEmitter();

	public displayedRole : Role = null;

	public isLoading = false;



    constructor(
		private roleService : RoleService,
		private modalService: ModalService) {
    }


	ngOnInit() {

	}


	ngOnChanges() {
		this.updateDisplay();
	}


	updateDisplay() {
		if(this.role == null) {
			this.displayedRole = null;
			return;
		}

		this.isLoading = true;
		this.roleService.findById(this.role).subscribe((role : Role) =>  {
			this.displayedRole = role;
			this.isLoading = false;
		},
		() => {
			console.log("Could not load role!");
		});
	}


	openSelectionDialog() {
		let modal = this.modalService.create(YawlResourcesDialogsModule, RoleSelectDialogComponent, {
				'ignore': this.ignore,
				'onSelected': (role) => this.select(role),
				'showNoSelectionButton': true
			});
		modal.subscribe((ref) => {});
	}


	select(role) {
		if(role == null) {
			this.deselect();
			return;
		}
		this.roleChanged.emit(role.id);
		this.displayedRole = role;
	}


	deselect() {
		this.displayedRole = null;
		this.roleChanged.emit(null);
	}

}
