import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';

import { AssetCategoryService } from '../../yawl/resources/services/asset-category.service';
import { AssetCategory } from '../../yawl/resources/entities/asset-category.entity';



@Component({
    templateUrl: 'asset-category-add.page.html'
})
export class AssetCategoryAddPage {

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private notificationsService : NotificationsService,
		private assetCategoryService : AssetCategoryService) {
	}


	save(assetCategory : AssetCategory) {
		this.assetCategoryService.save(assetCategory).subscribe((result) => {
			this.cancel();
			this.notificationsService.success("Asset saved", "The new asset category was added.");
		},
		(error) => {
			this.notificationsService.error("Error", "Could not add asset category: "+error);
		})
	}


	cancel() {
		let url = '/assets';
		this.router.navigate([url]);
	}

}
