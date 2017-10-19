import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import { DialogsService } from '../../util/dialogs/dialogs.service'

import { AssetService } from '../../yawl/resources/services/asset.service';
import { AssetCategoryService } from '../../yawl/resources/services/asset-category.service';



@Component({
    templateUrl: 'assets-list.page.html'
})
export class AssetsListPage {

	@ViewChild('searchBox')
	private searchBox : ElementRef;

    private assets = [];
    private assetCategories = [];

    private displayedItems = [];

    private selectedCategoryId : string | null = null;
    private selectedSubCategoryId : number | null = null;

	private isLoading = false;

	private searchQuery = '';


	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private notificationsService : NotificationsService,
		private dialogsService : DialogsService,
		private assetService : AssetService,
		private assetCategoryService : AssetCategoryService) {

		this.route.queryParams.subscribe(params => {
			this.selectedCategoryId = params['catId'];
            this.selectedSubCategoryId = params['subCatId'];
            
            this.prepareDisplayedItems();
        });
	}

	ngOnInit() {
		this.reload();
	}

	ngAfterViewInit() {
        this.searchBox.nativeElement.focus();
    }


	reload() {
		this.isLoading = true;

        Observable.forkJoin(
                this.assetService.findAll(),
                this.assetCategoryService.findAll())
            .subscribe((data: any[]) => {
                this.assets = data[0].sort((t1,t2) => t1.name.localeCompare(t2.name))
                                     .map((element) => {
                                         element.type = 'asset';
                                         return element;
                                     });
                this.assetCategories = data[1].sort((t1,t2) => t1.name.localeCompare(t2.name))
                                     .map((element) => {
                                         element.type = 'category';
                                         return element;
                                     });
                this.prepareDisplayedItems();
            },
            (error) => {
                this.notificationsService.error("Could not load assets!", error);
            },
            () => {
                this.isLoading = false;
            });

		
	}


	prepareDisplayedItems() {
        this.displayedItems = [];

        if(this.selectedCategoryId) {
            let category = this.assetCategories.find((element) => element.id == this.selectedCategoryId);
            if(category) {
                if(!this.selectedSubCategoryId) {
                    let noneSubCategory = category.subCategories.find((element) => element.name == "None");

                    // Show all subcategories without None
                    this.displayedItems = this.displayedItems.concat(category.subCategories.filter((element) => element.name != "None"));

                    // Show all assets in this category
                    let assetsOfCategory = this.assets.filter((element) => element.categoryId == this.selectedCategoryId
                                                                                && element.subCategoryId == noneSubCategory.id);
                    this.displayedItems = this.displayedItems.concat(assetsOfCategory);
                    return;
                } else {
                    let assetsOfCategory = this.assets.filter((element) => element.categoryId == this.selectedCategoryId
                                                                                && element.subCategoryId == this.selectedSubCategoryId);
                    this.displayedItems = this.displayedItems.concat(assetsOfCategory);
                    return;
                }
            }
        }

        this.displayedItems = this.displayedItems.concat(this.assetCategories);
	}


	openFormForNewAsset() {
        let url = '/asset/new';
        let subCategoryId = this.selectedSubCategoryId;
        if(!subCategoryId) {
            let category = this.assetCategories.find((element) => element.id == this.selectedCategoryId);
            if(category) {
                 let subCategory = category.subCategories.find((element) => element.name == "None");
                 if(subCategory) {
                     subCategoryId = subCategory.id;
                 }
            }
        }

        let queryParams = {
                'catId': this.selectedCategoryId,
                'subCatId': subCategoryId
            };
		this.router.navigate([url], {queryParams});
	}


	openFormForNewCategory() {
		let url = '/asset/category/new';
		this.router.navigate([url]);
	}


	openFormForNewSubCategory() {
		let url = '/asset/subcategory/new';
        let queryParams = {
                'catId': this.selectedCategoryId
            };
		this.router.navigate([url], {queryParams});
	}


	goBack() {
        let url = '/assets';
        let queryParams = {};

        if(this.selectedSubCategoryId) {
            queryParams = {
                'catId': this.selectedCategoryId
            };
        }
		
        this.router.navigate([url], {queryParams});
        this.searchQuery = '';
	}


	gotoDetailsPage(item) {
        this.searchQuery = '';
        
        if(item.type == 'asset') {
            //this.router.navigate(['asset', item.id]);
        }
        else if(item.type == 'category') {
            let queryParams = {
                'catId': item.id
            };
            this.router.navigate(['assets'], {queryParams});
        }
        else {
            let queryParams = {
                'catId': this.selectedCategoryId,
                'subCatId': item.id
            };
            this.router.navigate(['assets'], {queryParams});
        }
		
	}


	gotoEditPage(item) {
    }


	intendRemove(item) {
        if(item.type == 'asset') {
            let title = "Delete asset";
            let message = "Are you sure you want to delete the asset \""+item.name+"\"?";
            this.dialogsService.openConfirmationDialog(title, message, () => {
                this.assetService.remove(item.id).subscribe(() => {
                    this.reload();
                });
            });
        }
        else if(item.type == 'category') {
            let title = "Delete category";
            let message = "Are you sure you want to delete the category \""+item.name+"\"?";
            this.dialogsService.openConfirmationDialog(title, message, () => {
                this.assetCategoryService.remove(item.id).subscribe(() => {
                    this.reload();
                });
            });
        }
        else {
            let title = "Delete sub category";
            let message = "Are you sure you want to delete the sub category \""+item.name+"\"?";
            this.dialogsService.openConfirmationDialog(title, message, () => {
                this.assetCategoryService.removeSubCategory(this.selectedCategoryId, item.id).subscribe(() => {
                    this.reload();
                });
            });
        }
		
	}
}
