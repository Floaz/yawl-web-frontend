import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { OAuthService } from '../../../common/oauth/oauth.service';

import { YawlResourcesConfigService } from '../yawl-resources-config.service';

import { User } from '../entities/user.entity';



@Injectable()
export class UserService {

	public notificationsChanged = new Subject();


	constructor(private http: Http,
				private yawlResourcesConfigService : YawlResourcesConfigService,
				private oauthService : OAuthService) {
	}



	findAll() : Observable<User[]> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "users";

		return this.http.get(url, {headers})
				.map((res: Response) => res.json())
				.map((res) => res.users)
				.catch((error) => this.handleError(error));
	}


	findById(id : string) : Observable<User> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "user/"+encodeURIComponent(id);

		return this.http.get(url, {headers})
				.map((res: Response) => res.json())
				.catch((error) => this.handleError(error));
	}


	save(user : User) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "user";

		return this.http.post(url, user, {headers})
				.map((res: Response) => res.json())
				.catch((error) => this.handleError(error));
	}


	update(user : User) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");
		headers.append("Content-Type", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "user/"+encodeURIComponent(user.id);

		return this.http.put(url, user, {headers})
				.catch((error) => this.handleError(error));
	}


	updatePassword(userId : string, newPassword : string) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");
		headers.append("Content-Type", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "user/" + encodeURIComponent(userId);

		let data = {
			'password': newPassword
		};

		return this.http.put(url, data, {headers})
				.catch((error) => this.handleError(error));
	}


	remove(userId : string) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "user/"+encodeURIComponent(userId);

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
