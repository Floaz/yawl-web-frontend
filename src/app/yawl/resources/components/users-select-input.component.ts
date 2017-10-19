import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ModalService }			from '../../../util/modal/modal.service';

import { YawlResourcesDialogsModule }	from '../yawl-resources-dialogs.module';
import { UserSelectDialogComponent }	from '../dialogs/user-select-dialog.component';

import { User }					from '../entities/user.entity';


@Component({
    selector: 'users-select',
    templateUrl: 'users-select-input.component.html'
})
export class UsersSelectInputComponent {

	@Input("users")
	public users : User[] = [];

	@Input("ignore")
	public ignore : string[] = [];

	@Output()
	usersChange = new EventEmitter();

	public isLoading = false;



    constructor(
		private modalService: ModalService) {
    }


	ngOnInit() {

	}


	openSelectionDialog() {
		let ignore = this.users.map((user) => user.id);

		let modal = this.modalService.create(YawlResourcesDialogsModule, UserSelectDialogComponent, {
				'ignore': ignore,
				'onSelected': (user) => this.addItem(user),
				'showNoSelectionButton': false
			});
		modal.subscribe((ref) => {});
	}


	addItem(user) {
		if(user == null) {
			return;
		}
		this.users.push(user);
		this.usersChange.emit(this.users);
	}


	removeItem(user) {
		var index = this.users.indexOf(user, 0);
		if (index > -1) {
		   this.users.splice(index, 1);
		}

		this.usersChange.emit(this.users);
	}

}
