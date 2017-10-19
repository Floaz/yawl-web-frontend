import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { OAuthService } from '../../../common/oauth/oauth.service';

import { YawlResourcesConfigService } from '../yawl-resources-config.service';

import { Asset } from '../entities/asset.entity';



@Injectable()
export class AssetService {

	constructor(private http: Http,
				private yawlResourcesConfigService : YawlResourcesConfigService,
				private oauthService : OAuthService) {
	}


	findAll() : Observable<Asset[]> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "assets";

		return this.http.get(url, {headers})
				.map((res: Response) => res.json())
				.map((res) => <Asset[]> res.assets)
				.catch((error) => this.handleError(error));
	}


	findById(id : string) : Observable<Asset> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "asset/"+encodeURIComponent(id);

		return this.http.get(url, {headers})
				.map((res: Response) => <Asset> res.json())
				.catch((error) => this.handleError(error));
	}


	save(asset : Asset) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "asset";

		return this.http.post(url, asset, {headers})
				.map((res: Response) => <Asset> res.json())
				.catch((error) => this.handleError(error));
	}


	update(asset : Asset) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");
		headers.append("Content-Type", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "asset/"+encodeURIComponent(asset.id);

		return this.http.put(url, asset, {headers})
				.catch((error) => this.handleError(error));
	}


	remove(assetId : string) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "asset/"+encodeURIComponent(assetId);

		return this.http.delete(url, {headers})
				.catch((error) => this.handleError(error));
	}


	private handleError(error: any) : Observable<any> {
		let errMsg = (error.json().message)
						? error.json().message
						: error.status ? `${error.status} - ${error.statusText}` : 'Server error';
		console.error(errMsg);
		return Observable.throw(errMsg);
	}

}
