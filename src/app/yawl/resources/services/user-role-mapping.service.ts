import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { OAuthService } from '../../../common/oauth/oauth.service';

import { YawlResourcesConfigService } from '../yawl-resources-config.service';

import { User }		from '../entities/user.entity';
import { Role }		from '../entities/role.entity';



@Injectable()
export class UserRoleMappingService {

	public notificationsChanged = new Subject();


	constructor(private http: Http,
				private yawlResourcesConfigService : YawlResourcesConfigService,
				private oauthService : OAuthService) {
	}


	getUsersByRole(roleId : string) : Observable<User[]> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "role/"+encodeURIComponent(roleId)
																		  +"/users";

		return this.http.get(url, {headers})
				.map((res: Response) => res.json().users)
				.catch((error) => this.handleError(error));
	}


	getRolesByUser(userId : string) : Observable<Role[]> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "user/"+encodeURIComponent(userId)
																		  +"/roles";

		return this.http.get(url, {headers})
				.map((res: Response) => res.json().roles)
				.catch((error) => this.handleError(error));
	}


	addUserRoleLink(userId : string, roleId : string) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "role/"+encodeURIComponent(roleId)+"/users/identifiers";

		return this.http.post(url, userId, {headers})
				.catch((error) => this.handleError(error));
	}


	deleteUserRoleLink(userId : string, roleId : string) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "role/"+encodeURIComponent(roleId)
																		  +"/user/"+encodeURIComponent(userId);

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
