import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';

import { AssetCategoryService } from '../../yawl/resources/services/asset-category.service';



@Component({
    templateUrl: 'asset-sub-category-add.page.html'
})
export class AssetSubCategoryAddPage {

	private selectedCategoryId: string;
	private name;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private notificationsService : NotificationsService,
		private assetCategoryService : AssetCategoryService) {

		this.route.queryParams.subscribe(params => {
			this.selectedCategoryId = params['catId'];
        });
	}


	save() {
		this.assetCategoryService.saveSubCategory(this.selectedCategoryId, this.name).subscribe((result) => {
			this.cancel();
			this.notificationsService.success("Asset sub category saved", "The new asset sub category was added.");
		},
		(error) => {
			this.notificationsService.error("Error", "Could not add asset sub category: "+error);
		})
	}


	cancel() {
		let queryParams = {
			'catId': this.selectedCategoryId
		};
		this.router.navigate(['assets'], {queryParams});
	}

}
