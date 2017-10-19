import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { OAuthService } from '../../../common/oauth/oauth.service';

import { YawlResourcesConfigService } from '../yawl-resources-config.service';

import { Role } from '../entities/role.entity';



@Injectable()
export class RoleService {

	public notificationsChanged = new Subject();


	constructor(private http: Http,
				private yawlResourcesConfigService : YawlResourcesConfigService,
				private oauthService : OAuthService) {
	}



	findAll() : Observable<Role[]> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "roles";

		return this.http.get(url, {headers})
				.map((res: Response) => res.json())
				.map((res) => res.roles)
				.catch((error) => this.handleError(error));
	}


	findById(id : string) : Observable<Role> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "role/"+encodeURIComponent(id);

		return this.http.get(url, {headers})
				.map((res: Response) => res.json())
				.catch((error) => this.handleError(error));
	}


	save(role : Role) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "role";

		return this.http.post(url, role, {headers})
				.map((res: Response) => res.json())
				.catch((error) => this.handleError(error));
	}


	update(role : Role) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "role/"+encodeURIComponent(role.id);

		return this.http.put(url, role, {headers})
				.catch((error) => this.handleError(error));
	}


	remove(roleId : string) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "role/"+encodeURIComponent(roleId);

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
