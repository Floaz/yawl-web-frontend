import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../entities/user.entity';



@Component({
    selector: 'user-list',
    templateUrl: 'user-list.component.html'
})
export class UserListComponent {

	@Input("users")
	items : User[] = [];

	@Input("selectable")
	selectable = true;

	@Input("selectedItem")
	selectedItem = null;

	@Input("searchFilter")
	searchFilter = null;

	@Input("noItemsMessage")
	private noItemsMessage = "No users!";

	@Input("showDetailsLink")
	showDetailsLink = false;

	@Input("showRemoveButton")
	showRemoveButton = false;

	@Output()
	selectedItemChange = new EventEmitter();

	@Output()
	onRemoveButton = new EventEmitter();

	sortedItems : User[] = [];



	constructor(
		private router: Router) {
	}


	ngOnChanges() {
		this.filter();
	}


	sort() {
		this.sortedItems.sort((n1,n2) => {
			if (n1.lastname > n2.lastname) {
			   return 1;
			}
			if (n1.lastname < n2.lastname) {
				return -1;
			}
			if (n1.firstname > n2.firstname) {
			   return 1;
			}
			if (n1.firstname < n2.firstname) {
				return -1;
			}
			return 0;
		});
	}


	filter() {
		if(this.searchFilter != null && this.searchFilter !== "") {
			this.sortedItems = this.items
				.filter((el : User) => {
					return (el.username).toLowerCase().indexOf(this.searchFilter.toLowerCase()) > -1
							|| (el.lastname).toLowerCase().indexOf(this.searchFilter.toLowerCase()) > -1
							|| (el.firstname).toLowerCase().indexOf(this.searchFilter.toLowerCase()) > -1
							|| (el.description && el.description.toLowerCase().indexOf(this.searchFilter.toLowerCase()) > -1)
							|| (el.notes && el.notes.toLowerCase().indexOf(this.searchFilter.toLowerCase()) > -1);
				})
		} else {
			this.sortedItems = this.items;
		}

		this.sort();
	}


	onSelect(item) {
		this.selectedItem = item;
		this.selectedItemChange.emit(item);
	}


	gotoDetailsPage(item) {
		let url = '/user/'+item.id;
		this.router.navigate([url]);
	}

}
