import { Component, Input, Output, EventEmitter } from '@angular/core';

import { AssetCategory } from '../../yawl/resources/entities/asset-category.entity';



@Component({
    selector: 'asset-category-form',
    templateUrl: 'asset-category-form.component.html'
})
export class AssetCategoryFormComponent {

	@Input("assetCategory")
	assetCategory : AssetCategory = null;

	@Output("saved")
	saved = new EventEmitter();

	@Output("canceled")
	canceled = new EventEmitter();


	constructor() {
		this.reset();
	}


	reset() {
		this.assetCategory = {
			id: null,
			name: "",
			description: "",
			notes: "",
			subCategories: null
		};
	}

	save() {
		this.saved.emit(this.assetCategory);
	}


	cancel() {
		this.canceled.emit();
	}

}
