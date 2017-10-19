import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { OAuthService } from '../common/oauth/oauth.service';




/**
 * This is the service for retrieving notification.
 * 
 * @author Philipp Thomas
 */
@Injectable()
export class NotificationsService {

	public notificationsChanged = new Subject();


	constructor(private http: Http,
				private oauthService : OAuthService) {
	}


	getAllNotifications() : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());

		let url = "http://localhost:8081/api/notification";

		return this.http.get(url, {headers})
			.map((res: Response) => res.json())
			.catch((error) => this.handleError(error));
	}


	getNotificationById(id : string) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());

		let url = "http://localhost:8081/api/notification/"+id;
		
		return this.http.get(url, {headers})
			.map((res: Response) => res.json())
			.catch((error) => this.handleError(error));
	}


	changeMuteState(id : string, newMuteState : boolean) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());

		let url = "http://localhost:8081/api/notification/"+id;

		let data = {
			'status': newMuteState ? 1 : 0
		};

		let observable = this.http.put(url, data, {headers})
			.catch((error) => this.handleError(error)).share();

		observable.subscribe(() => this.notificationsChanged.next(id));

		return observable;
	}


	delay(id : string, delayUntil : number) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());

		let url = "http://localhost:8081/api/notification/"+id;

		let data = {
			'delayUntil': delayUntil
		};

		let observable = this.http.put(url, data, {headers})
			.catch((error) => this.handleError(error)).share();

		observable.subscribe(() => this.notificationsChanged.next(id));

		return observable;
	}


	addComment(id : string, comment : string) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());

		let url = "http://localhost:8081/api/notification/"+id+"/comment";

		let data = {
			comment
		};

		let observable = this.http.post(url, data, {headers})
			.catch((error) => this.handleError(error)).share();

		observable.subscribe(() => this.notificationsChanged.next(id));

		return observable;
	}


	removeComment(id : string, commentId : string) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());

		let url = "http://localhost:8081/api/notification/"+id+"/comment/"+commentId;

		let observable = this.http.delete(url, {headers})
							.catch((error) => this.handleError(error)).share();

		observable.subscribe(() => this.notificationsChanged.next(id));

		return observable;
	}



	private handleError(error: any) : Observable<any> {
		let errMsg = (error.message)
						? error.message
						: error.status ? `${error.status} - ${error.statusText}` : 'Server error';
		console.error(errMsg);
		return Observable.throw(errMsg);
	}


}
