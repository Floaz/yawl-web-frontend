import { Component, Input, Output, EventEmitter } from '@angular/core';



@Component({
    selector: 'case-list',
    templateUrl: 'case-list.component.html'
})
export class CaseListComponent {

	@Input("cases")
	items = [];

	@Input("noItemsMessage")
	private noItemsMessage = "No cases!";

	@Output()
	onCancel = new EventEmitter();

	sortedItems = [];


	ngOnChanges() {
		this.sort();
	}


	sort() {
		this.sortedItems = [];

		if(!this.items) {
			return;
		}

		this.items.forEach((x) => {
		  this.sortedItems.push(x);
		})

		this.sortedItems.sort((n1,n2) => {
			if (Number(n1.id) > Number(n2.id)) {
			   return 1;
			}
			if(Number(n2.id) < Number(n1.id)) {
				return -1;
			}
			return 0;
		});
	}

}
