import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';



@Component({
    selector: 'org-group-list',
    templateUrl: 'org-group-list.component.html'
})
export class OrgGroupListComponent {

	@Input("orgGroups")
	items = [];

	@Input("selectable")
	selectable = false;

	@Input("selectedItem")
	selectedItem = null;

	@Input("searchFilter")
	searchFilter = null;

	@Input("noItemsMessage")
	private noItemsMessage = "No groups!";

	@Input("showDetailsLink")
	showDetailsLink = false;

	@Output()
	selectedItemChange = new EventEmitter();

	sortedItems = [];


	constructor(
		private router: Router) {
	}


	ngOnChanges() {
		this.filter();
	}


	sort() {
		this.sortedItems.sort((n1,n2) => {
			if (n1.name > n2.name) {
			   return 1;
			}
			if (n1.name < n2.name) {
				return -1;
			}
			return 0;
		});
	}


	filter() {
		if(this.searchFilter != null && this.searchFilter !== "") {
			this.sortedItems = this.items
				.filter((el) => {
					return (el.name).toLowerCase().indexOf(this.searchFilter.toLowerCase()) > -1
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
		this.router.navigate(['position', item.id]);
	}

}
