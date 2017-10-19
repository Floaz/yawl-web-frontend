import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { OAuthService } from '../../../common/oauth/oauth.service';

import { YawlResourcesConfigService } from '../yawl-resources-config.service';

import { Capability } from '../entities/capability.entity';



@Injectable()
export class AbstractResourceService<T> {

	public notificationsChanged = new Subject();


	constructor(private resourceUrlPath : string,
				private getAllAttribute : string,
				private http: Http,
				private yawlResourcesConfigService : YawlResourcesConfigService,
				private oauthService : OAuthService) {
	}



	findAll() : Observable<T[]> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + this.resourceUrlPath;

		return this.http.get(url, {headers})
				.map((res: Response) => res.json())
				.map((res) => res[this.getAllAttribute])
				.catch((error) => this.handleError(error));
	}


	findById(id : string) : Observable<T> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + this.resourceUrlPath + "/"+encodeURIComponent(id);

		return this.http.get(url, {headers})
				.map((res: Response) => res.json())
				.catch((error) => this.handleError(error));
	}


	save(resource : T) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + this.resourceUrlPath;

		return this.http.post(url, resource, {headers})
				.map((res: Response) => res.json())
				.catch((error) => this.handleError(error));
	}


	update(id : string, resource : T) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + this.resourceUrlPath + "/"+encodeURIComponent(id);

		return this.http.put(url, resource, {headers})
				.catch((error) => this.handleError(error));
	}


	remove(id : string) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + this.resourceUrlPath + "/"+encodeURIComponent(id);

		return this.http.delete(url, {headers})
				.catch((error) => this.handleError(error));
	}


	private handleError(error: any) : Observable<any> {
		let errMsg = (error.message)
						? error.message
						: error.status ? `${error.status} - ${error.statusText}` : 'Server error';
		console.error(errMsg);
		return Observable.throw(errMsg);
	}


}
