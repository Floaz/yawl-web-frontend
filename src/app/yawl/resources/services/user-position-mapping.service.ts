import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { OAuthService } from '../../../common/oauth/oauth.service';

import { YawlResourcesConfigService } from '../yawl-resources-config.service';

import { User }		from '../entities/user.entity';
import { Position }	from '../entities/position.entity';


@Injectable()
export class UserPositionMappingService {

	public notificationsChanged = new Subject();


	constructor(private http: Http,
				private yawlResourcesConfigService : YawlResourcesConfigService,
				private oauthService : OAuthService) {
	}


	getUsersByPosition(positionId : string) : Observable<User[]> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "position/"+encodeURIComponent(positionId)
																		  +"/users";

		return this.http.get(url, {headers})
				.map((res: Response) => res.json().users)
				.catch((error) => this.handleError(error));
	}


	getPositionsByUser(userId : string) : Observable<Position[]> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "user/"+encodeURIComponent(userId)
																		  +"/positions";

		return this.http.get(url, {headers})
				.map((res: Response) => res.json().positions)
				.catch((error) => this.handleError(error));
	}


	addUserPositionLink(userId : string, positionId : string) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "position/"+encodeURIComponent(positionId)
																		  +"/users/identifiers";

		return this.http.post(url, userId, {headers})
				.catch((error) => this.handleError(error));
	}


	deleteUserPositionLink(userId : string, positionId : string) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "position/"+encodeURIComponent(positionId)
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
