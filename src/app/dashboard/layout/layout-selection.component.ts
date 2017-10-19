import { Component, Input, Output, EventEmitter } from '@angular/core';



@Component({
    selector: 'layout-selection',
    templateUrl: 'layout-selection.component.html'
})
export class LayoutSelectionComponent {

	@Input("selection")
	selection = [];

	@Output("onChange")
	onChange : EventEmitter<any> = new EventEmitter();


	items = [
		{ columns: [6, 6] },
		{ columns: [4, 8] },
		{ columns: [8, 4] },
		{ columns: [3, 9] },
		{ columns: [9, 3] },
		{ columns: [4, 4, 4] }
	];


	isActive(item) : boolean {
		return this.compareColumns(item.columns, this.selection);
	}


	compareColumns(columns1, columns2) : boolean {
		if(!columns1) {
			return false;
		}

		if(!columns2) {
			return false;
		}

		if(columns1.length != columns2.length) {
			return false;
		}

		for(var i = 0, l = columns1.length; i < l; ++i) {
			if(columns1[i] != columns2[i]) {
				return false;
			}
		}

		return true;
	}


	selectBox(item) {
		this.onChange.emit(item.columns);
	}

}
