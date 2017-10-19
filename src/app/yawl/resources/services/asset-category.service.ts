import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { OAuthService } from '../../../common/oauth/oauth.service';

import { YawlResourcesConfigService } from '../yawl-resources-config.service';

import { AssetCategory } from '../entities/asset-category.entity';



@Injectable()
export class AssetCategoryService {

	constructor(private http: Http,
				private yawlResourcesConfigService : YawlResourcesConfigService,
				private oauthService : OAuthService) {
	}


	findAll() : Observable<AssetCategory[]> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "assetcategories";

		return this.http.get(url, {headers})
				.map((res: Response) => res.json())
				.map((res) => <AssetCategory[]> res.assetCategories)
				.catch((error) => this.handleError(error));
	}


	findById(id : string) : Observable<AssetCategory> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "assetcategory/"+encodeURIComponent(id);

		return this.http.get(url, {headers})
				.map((res: Response) => <AssetCategory> res.json())
				.catch((error) => this.handleError(error));
	}


	save(assetCategory : AssetCategory) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "assetcategory";

		return this.http.post(url, assetCategory, {headers})
				.map((res: Response) => <AssetCategory> res.json())
				.catch((error) => this.handleError(error));
	}


	update(assetCategory : AssetCategory) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");
		headers.append("Content-Type", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "assetcategory/"+encodeURIComponent(assetCategory.id);

		return this.http.put(url, assetCategory, {headers})
				.catch((error) => this.handleError(error));
	}


	remove(assetCategoryId : string) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "assetcategory/"+encodeURIComponent(assetCategoryId);

		return this.http.delete(url, {headers})
				.catch((error) => this.handleError(error));
	}


	saveSubCategory(assetCategoryId : string, subCategoryName: string) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "assetcategory/"+encodeURIComponent(assetCategoryId)+"/subcategory";

		let data = {
			'name': subCategoryName
		};

		return this.http.post(url, data, {headers})
				.catch((error) => this.handleError(error));
	}

	removeSubCategory(assetCategoryId: string, assetSubCategoryId : number) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "assetcategory/"+encodeURIComponent(assetCategoryId)+"/subcategory/"+assetSubCategoryId;

		return this.http.delete(url, {headers})
				.catch((error) => this.handleError(error));
	}


	private handleError(error: any) : Observable<any> {
		let errMsg = (error.json().message)
						? error.json().message
						: error.status ? `${error.status} - ${error.statusText}` : 'Server error';
		return Observable.throw(errMsg);
	}

}
