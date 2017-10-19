import { Component, Input, Output, EventEmitter } from '@angular/core';

import { UserService }		from '../services/user.service';
import { User }				from '../entities/user.entity';


@Component({
    selector: 'participants-selection',
    templateUrl: 'participants-selection.component.html'
})
export class ParticipantsSelectionComponent {

	@Input("participants")
	public participants : string[] = [];

	@Output()
	participantsChange = new EventEmitter();

	public allUsers : User[] = [];
	public users = [];



    constructor(
		private userService : UserService) {
    }


	ngOnInit() {
		this.userService.findAll().subscribe((users : User[]) =>  {
			this.allUsers = users;
			this.updateList();
		},
		() => {
			console.log("Could not load users!");
		});
	}


	ngOnChanges() {
		this.updateList();
	}


	updateList() {
		this.users = this.allUsers.filter((user) => this.participants.indexOf(user.username) != -1);
	}


	onUsersChange(users) {
		this.users = users;
		this.participants = this.users.map((user) => user.username);
		this.participantsChange.emit(this.participants);
	}
}
