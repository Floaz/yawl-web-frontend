import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { OAuthService } from '../../../common/oauth/oauth.service';

import { YawlResourcesConfigService } from '../yawl-resources-config.service';

import { User }			from '../entities/user.entity';
import { Capability }	from '../entities/capability.entity';



@Injectable()
export class UserCapabilityMappingService {

	public notificationsChanged = new Subject();


	constructor(private http: Http,
				private yawlResourcesConfigService : YawlResourcesConfigService,
				private oauthService : OAuthService) {
	}


	getUsersByCapability(capabilityId : string) : Observable<User[]> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "capability/"+encodeURIComponent(capabilityId)
																		  +"/users";

		return this.http.get(url, {headers})
				.map((res: Response) => res.json().users)
				.catch((error) => this.handleError(error));
	}


	getCapabilitiesByUser(userId : string) : Observable<Capability[]> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "user/"+encodeURIComponent(userId)
																		  +"/capabilities";

		return this.http.get(url, {headers})
				.map((res: Response) => res.json().capabilities)
				.catch((error) => this.handleError(error));
	}


	addUserCapabilityLink(userId : string, capabilityId : string) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "capability/"+encodeURIComponent(capabilityId)
																		  +"/users/identifiers";

		return this.http.post(url, userId, {headers})
				.catch((error) => this.handleError(error));
	}


	deleteUserCapabilityLink(userId : string, capabilityId : string) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "capability/"+encodeURIComponent(capabilityId)
																		  +"/user/"+encodeURIComponent(userId);

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
