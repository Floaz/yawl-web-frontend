import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Asset } from '../../yawl/resources/entities/asset.entity';



@Component({
    selector: 'asset-form',
    templateUrl: 'asset-form.component.html'
})
export class AssetFormComponent {

	@Input("asset")
	asset : Asset = null;

	@Output("saved")
	saved = new EventEmitter();

	@Output("canceled")
	canceled = new EventEmitter();


	constructor() {
		this.reset();
	}


	reset() {
		this.asset = {
			id: null,
			name: "",
			description: "",
			notes: "",
			categoryId: null,
			subCategoryId: null
		};
	}

	save() {
		this.saved.emit(this.asset);
	}


	cancel() {
		this.canceled.emit();
	}

}
