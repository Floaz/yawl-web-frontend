import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { OAuthService } from '../common/oauth/oauth.service';

import { DashboardConfigService } from './dashboard-config.service';



@Injectable()
export class DashboardService {

	public dashboardChanged = new Subject();


	constructor(private http: Http,
				private dashboardConfigService : DashboardConfigService,
				private oauthService : OAuthService) {
	}


	getDashboardsOfUser() : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());

		let url = this.dashboardConfigService.getDashboardServiceUrl() + "dashboard";

		return this.http.get(url, {headers})
			.map((res: Response) => res.json())
			.catch((error) => this.handleError(error));
	}


	getDashboardById(id : string) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());

		let url = this.dashboardConfigService.getDashboardServiceUrl() + "dashboard/"+id;

		return this.http.get(url, {headers})
			.map((res: Response) => res.json())
			.catch((error) => this.handleError(error));
	}


	addDashboard(title : string) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());

		let url = this.dashboardConfigService.getDashboardServiceUrl() + "dashboard";

		let data = { title };

		let observable = this.http.post(url, data, {headers})
											.map((res: Response) => res.json())
											.catch((error) => this.handleError(error)).share();

		observable.subscribe((result) => this.dashboardChanged.next(result.id));

		return observable;
	}


	renameDashboard(id : string, newTitle : string) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());

		let url = this.dashboardConfigService.getDashboardServiceUrl() + "dashboard/"+id;

		let data = {
			title: newTitle
		};

		let observable = this.http.put(url, data, {headers})
			.catch((error) => this.handleError(error)).share();

		observable.subscribe(() => this.dashboardChanged.next(id));

		return observable;
	}


	changeOrderNo(id : string, orderNo : number) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());

		let url = this.dashboardConfigService.getDashboardServiceUrl() + "dashboard/"+id;

		let data = {
			orderNo
		};

		let observable = this.http.put(url, data, {headers})
						.catch((error) => this.handleError(error)).share();

		observable.subscribe(() => this.dashboardChanged.next(id));

		return observable;
	}


	removeDashboard(id : string) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());

		let url = this.dashboardConfigService.getDashboardServiceUrl() + "dashboard/"+id;

		let observable = this.http.delete(url, {headers})
							.catch((error) => this.handleError(error)).share();

		observable.subscribe(() => this.dashboardChanged.next(id));

		return observable;
	}


	loadLayoutSettings(id : string) : Observable<any> {
		if(!id) {
			return;
		}

		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());

		let url = this.dashboardConfigService.getDashboardServiceUrl() + "dashboard/"+id+"/layout-settings";

		return this.http.get(url, {headers})
					.map((res : Response) => res.json())
					.catch((error) => this.handleError(error));
	}


	saveLayoutSettings(id : string, settings : any) : Observable<any> {
		if(!id) {
			return;
		}

		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());

		let url = this.dashboardConfigService.getDashboardServiceUrl() + "dashboard/"+id+"/layout-settings";

		return this.http.put(url, settings, {headers})
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
