import { Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';

import { OAuthService } from '../../../common/oauth/oauth.service';

import { DashletService } from '../../dashlet.service';

import { DashboardConfigService } from '../../dashboard-config.service';



export interface ParticipantData {
	name : String;
	numberOffered : number;
	numberAccepted : number;
	numberStarted : number;
	sumIdleTime : number;
}


@Component({
    selector: 'participants-table-dashlet',
    templateUrl: 'participants-table.dashlet.html'
})
export class ParticipantsTableDashlet {

	dashletId : string;

	data = [];
	settings : any = {};


	isLoading = false;

	timer : any;


	constructor(private http: Http,
				private oauthService : OAuthService,
				private dashletService: DashletService,
				private dashboardConfigService : DashboardConfigService,
				private router: Router) {
	}

	onDashletCreated() {
		this.reload();

		this.timer = setInterval(() => this.loadData(), 30000);
	}

	ngOnDestroy() {
		if(this.timer) {
			clearInterval(this.timer);
		}
	}

	reload() {
		this.loadSettings(() => this.loadData());
	}


	loadData() {
		this.isLoading = true;

		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());

		let url = this.dashboardConfigService.getDashboardServiceUrl() + "dashlet/participants-table/"+this.dashletId+"/data";

		this.http.get(url, {headers}).subscribe(
			(res: Response) => this.handleResponse(res),
			(error) => {},
			() => {
				this.isLoading = false;
			});
	}


	handleResponse(res : Response) {
		this.data = [];
		let participants = res.json().data;
		for(let pdata of participants) {
			this.data.push(pdata);
		}

		this.data.sort((t1, t2) => {
			if(this.settings.sortColumnDirection == 'ASC') {
				if(t1[this.settings.sortColumn] > t2[this.settings.sortColumn]) return 1;
				if(t1[this.settings.sortColumn] < t2[this.settings.sortColumn]) return -1;
				return 0;
				//return t1[this.settings.sortColumn] - t2[this.settings.sortColumn];
			} else {
				if(t1[this.settings.sortColumn] < t2[this.settings.sortColumn]) return 1;
				if(t1[this.settings.sortColumn] > t2[this.settings.sortColumn]) return -1;
				return 0;
				//return t2[this.settings.sortColumn] - t1[this.settings.sortColumn];
			}
		});
	}


	loadSettings(callback : any) {
		if(!this.dashletId) {
			return;
		}

		this.isLoading = true;
		this.dashletService.loadSettings(this.dashletId)
					.subscribe(
						(res : any) => {
							this.settings = res;
							callback && callback();
						},
						(error) => {
						},
						() => {
							this.isLoading = false;
						});
	}


	navigateToSettings() {
		let url = this.dashboardConfigService.getDashboardServiceUrl() + 'dashlet/'+this.dashletId+'/settings';
		this.router.navigate([url]);
	}

}
