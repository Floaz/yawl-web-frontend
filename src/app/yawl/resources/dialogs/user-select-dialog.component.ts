import { Component, ViewChild, ElementRef }     from '@angular/core';

import { Modal } from '../../../util/modal/modal.decorator';

import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';



@Component({
    selector: "user-select-dialog.component",
    templateUrl: 'user-select-dialog.component.html'
})
@Modal()
export class UserSelectDialogComponent {

	@ViewChild('searchBox')
	searchBox : ElementRef;

	ignore : string[] = [];

	onSelected : Function;

    title : string = "Select user";

	showNoSelectionButton = false;

	public searchQuery = '';

	public users = [];

	closeModal : Function;


    constructor(
		private userService : UserService) {
    }

	ngAfterViewInit() {
        this.searchBox.nativeElement.focus();
    }


    select(user) : void{
        this.closeModal();
		this.onSelected(user);
    }


	ngOnInit() {
		this.userService.findAll().subscribe((users : User[]) =>  {
			this.users = users.filter((el : User) => {
				return this.ignore.indexOf(el.id) == -1;
			});
		},
		() => {
			console.log("Could not load users!");
		});
	}

}


