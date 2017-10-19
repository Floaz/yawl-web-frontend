import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { OAuthService } from '../../../common/oauth/oauth.service';

import { YawlResourcesConfigService } from '../yawl-resources-config.service';

import { Specification } from '../entities/specification.entity';



@Injectable()
export class SpecificationService {

	constructor(private http: Http,
				private yawlResourcesConfigService : YawlResourcesConfigService,
				private oauthService : OAuthService) {
	}


	findAll() : Observable<Specification[]> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "specification";

		return this.http.get(url, {headers})
				.map((res: Response) => res.json())
				.map((res) => res.specifications)
				.catch((error) => this.handleError(error));
	}


	findById(id : string, version : string) : Observable<Specification> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "specification/"
																			+ encodeURIComponent(id)
																			+ "/" + encodeURIComponent(version);

		return this.http.get(url, {headers})
				.map((res: Response) => res.json())
				.catch((error) => this.handleError(error));
	}


	save(item : string) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");
		headers.append("Content-Type", "application/xml");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "specification";

		return this.http.post(url, item, {headers})
				.catch((error) => this.handleError(error));
	}


	remove(id : string, version : string) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "specification/"
																			+encodeURIComponent(id)
																			+"/"+encodeURIComponent(version);

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
