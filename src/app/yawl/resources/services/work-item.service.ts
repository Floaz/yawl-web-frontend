import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { OAuthService } from '../../../common/oauth/oauth.service';

import { YawlResourcesConfigService } from '../yawl-resources-config.service';

import { WorkItem } from '../entities/work-item.entity';
import { User } from '../entities/user.entity';



@Injectable()
export class WorkItemService {

	constructor(private http: Http,
				private yawlResourcesConfigService : YawlResourcesConfigService,
				private oauthService : OAuthService) {
	}


	findAll() : Observable<WorkItem[]> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "workitems";

		return this.http.get(url, {headers})
				.map((res: Response) => res.json())
				.map((res) => res.workItems)
				.catch((error) => this.handleError(error));
	}


	findAllUnoffered() : Observable<WorkItem[]> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "workitems/unoffered";

		return this.http.get(url, {headers})
				.map((res: Response) => res.json())
				.map((res) => res.workItems)
				.catch((error) => this.handleError(error));
	}


	findByUser(userId : string, queue : string) : Observable<WorkItem[]> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		if(queue != "offered" && queue != "allocated" && queue != "started" && queue != "suspended") {
			console.log("Illegal queue");
		}

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "user/"
																		  + encodeURIComponent(userId)
																		  + "/workitems/" + queue;

		return this.http.get(url, {headers})
				.map((res: Response) => res.json())
				.map((res) => res.workItems)
				.catch((error) => this.handleError(error));
	}


	findById(id : string) : Observable<WorkItem> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "workitem/" + encodeURIComponent(id);

		return this.http.get(url, {headers})
				.map((res: Response) => res.json())
				.catch((error) => this.handleError(error));
	}


	getParticipantsOfWorkItem(id : string) : Observable<User[]> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "workitem/" + encodeURIComponent(id) + "/participants";

		return this.http.get(url, {headers})
				.map((res: Response) => res.json())
				.map((res) => res.users)
				.catch((error) => this.handleError(error));
	}


	reofferWorkItem(id : string, userIds : string[]) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");
		headers.append("Content-Type", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "workitem/" + encodeURIComponent(id) + "/offer";

		let data = {
			'users': userIds
		};

		return this.http.post(url, data, {headers})
				.catch((error) => this.handleError(error));
	}


	reallocateWorkItem(id : string, userId : string) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");
		headers.append("Content-Type", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "workitem/" + encodeURIComponent(id) + "/allocate";

		let data = {
			'user': userId
		};

		return this.http.post(url, data, {headers})
				.catch((error) => this.handleError(error));
	}


	restartWorkItem(id : string, userId : string) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");
		headers.append("Content-Type", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "workitem/" + encodeURIComponent(id) + "/start";

		let data = {
			'user': userId
		};

		return this.http.post(url, data, {headers})
				.catch((error) => this.handleError(error));
	}


	updateDocumentation(id : string, documentation : string) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());
		headers.append("Accept", "application/json");
		headers.append("Content-Type", "application/json");

		let url = this.yawlResourcesConfigService.getResourceServiceUrl() + "workitem/" + encodeURIComponent(id) + "/documentation";

		let data = {
			'documentation': documentation
		};

		return this.http.put(url, data, {headers})
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
