import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Specification } from '../entities/specification.entity';



@Component({
    selector: 'specification-list',
    templateUrl: 'specification-list.component.html'
})
export class SpecificationListComponent {

	@Input("specifications")
	private items : Specification[] = [];

	@Input("selectable")
	private selectable = false;

	@Input("selectedItem")
	private selectedItem = null;

	@Input("searchFilter")
	private searchFilter = null;

	@Input("noItemsMessage")
	private noItemsMessage = "No specification!";

	@Input("showDetailsLink")
	private showDetailsLink = false;

	@Input("showPlayButton")
	private showPlayButton = false;

	@Input("showRemoveButton")
	private showRemoveButton = false;

	@Output()
	private selectedItemChange = new EventEmitter();

	@Output()
	private onPlayButton = new EventEmitter();

	@Output()
	private onRemoveButton = new EventEmitter();


	private sortedItems : Specification[] = [];





	constructor(
		private router: Router) {
	}


	ngOnChanges() {
		this.filter();
	}


	sort() {
		this.sortedItems.sort((n1,n2) => {
			if(n1.uri > n2.uri) {
			   return 1;
			}
			if(n1.uri < n2.uri) {
				return -1;
			}
			if(n1.version > n2.version) {
			   return 1;
			}
			if(n1.version < n2.version) {
				return -1;
			}
			return 0;
		});
	}


	filter() {
		if(this.searchFilter != null && this.searchFilter !== "") {
			this.sortedItems = this.items
				.filter((el : Specification) => {
					return (el.uri).toLowerCase().indexOf(this.searchFilter.toLowerCase()) > -1;
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
		this.router.navigate(['specification', item.id]);
	}

}
