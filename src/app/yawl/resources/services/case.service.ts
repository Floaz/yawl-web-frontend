import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { OAuthService } from '../../../common/oauth/oauth.service';

import { YawlResourcesConfigService } from '../yawl-resources-config.service';

import { Case } from '../entities/case.entity';



@Injectable()
export class CaseService {

	constructor(private http: Http,
				private yawlResourcesConfigService : YawlResourcesConfigService,
				private oauthService : OAuthService) {
	}


	findAll() : Observable<Case[]> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "case";

		return this.http.get(url, {headers})
				.map((res: Response) => res.json())
				.map((res) => res.cases)
				.catch((error) => this.handleError(error));
	}


	findById(id : string) : Observable<Case> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "case/" + encodeURIComponent(id);

		return this.http.get(url, {headers})
				.map((res: Response) => res.json())
				.catch((error) => this.handleError(error));
	}


	findBySpecificationId(id : string, version : string) : Observable<Case> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "specification/"
																			+encodeURIComponent(id)
																			+ "/"+encodeURIComponent(version)
																			+ "/cases";
		return this.http.get(url, {headers})
				.map((res: Response) => res.json())
				.catch((error) => this.handleError(error));
	}


	startCase(id : string, version : string) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");
		headers.append("Content-Type", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "specification/"
																			+encodeURIComponent(id)
																			+ "/"+encodeURIComponent(version)
																			+ "/start";

		return this.http.post(url, {}, {headers})
				.catch((error) => this.handleError(error));
	}


	cancelCase(id : string) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "case/" + encodeURIComponent(id);

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
