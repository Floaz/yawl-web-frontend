import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { OAuthService } from '../common/oauth/oauth.service';

import { DashboardConfigService } from './dashboard-config.service';



@Injectable()
export class DashletService {

	constructor(private http: Http,
				private dashboardConfigService : DashboardConfigService,
				private oauthService : OAuthService) {
	}


	getDashletsOfDashboard(dashboardId : string) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());

		let url = this.dashboardConfigService.getDashboardServiceUrl() + "dashboard/"+dashboardId+"/dashlets";

		return this.http.get(url, {headers})
			.map((res: Response) => res.json())
			.catch((error) => this.handleError(error));
	}


	getDashletById(id : string) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());

		let url = this.dashboardConfigService.getDashboardServiceUrl() + "dashlet/"+id;

		return this.http.get(url, {headers})
			.map((res: Response) => res.json())
			.catch((error) => this.handleError(error));
	}


	addDashlet(dashboardId : string, title : string, dashletType : string) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());

		let url = this.dashboardConfigService.getDashboardServiceUrl() + "dashboard/"+dashboardId+"/dashlet";

		let data = { title, 'type': dashletType };

		return this.http.post(url, data, {headers})
			.map((res: Response) => res.json())
			.catch((error) => this.handleError(error));
	}


	renameDashlet(id : string, newName : string) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());

		let url = this.dashboardConfigService.getDashboardServiceUrl() + "dashlet/"+id;

		let data = {
			title: newName
		};

		return this.http.put(url, data, {headers})
			.catch((error) => this.handleError(error));
	}


	removeDashlet(id : string) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());

		let url = this.dashboardConfigService.getDashboardServiceUrl() + "dashlet/"+id;

		return this.http.delete(url, {headers})
			.catch((error) => this.handleError(error));
	}


	loadSettings(id : string) : Observable<any> {
		if(!id) {
			return;
		}

		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());

		let url = this.dashboardConfigService.getDashboardServiceUrl() + "dashlet/"+id+"/settings";

		return this.http.get(url, {headers})
					.map((res : Response) => res.json())
					.catch((error) => this.handleError(error));
	}


	saveSettings(id : string, settings : any) : Observable<any> {
		if(!id) {
			return;
		}

		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());

		let url = this.dashboardConfigService.getDashboardServiceUrl() + "dashlet/"+id+"/settings";

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
