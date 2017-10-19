import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { OAuthService } from '../../common/oauth/oauth.service';



@Injectable()
export class ObservationService {

	public observationsChanged = new Subject();


	constructor(private http: Http,
				private oauthService : OAuthService) {
	}


	getAllObservations() : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());

		let url = "http://localhost:8081/api/observation";

		return this.http.get(url, {headers})
			.map((res: Response) => res.json())
			.catch((error) => this.handleError(error));
	}


	getObservationById(id : string) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());

		let url = "http://localhost:8081/api/observation/"+id;

		return this.http.get(url, {headers})
			.map((res: Response) => res.json())
			.catch((error) => this.handleError(error));
	}


	addObservation(title: string, observer : string, settings : any) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());

		let url = "http://localhost:8081/api/observation/";

		let data = {
			'title': title,
			'type': observer,
			'settings': settings
		};

		let observable = this.http.post(url, data, {headers})
			.map((response : Response) => response.json())
			.catch((error) => this.handleError(error));

		return observable;
	}


	editObservation(observation: any) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());

		let url = "http://localhost:8081/api/observation/"+observation.id;

		let data = {
			'title': observation.title,
			'status': observation.status,
			'type': observation.type,
			'settings': observation.settings
		};

		let observable = this.http.put(url, data)
			.catch((error) => this.handleError(error));

		return observable;
	}


	removeObservation(id : string) : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.oauthService.getAuthorizationHeader());

		let url = "http://localhost:8081/api/observation/"+id;

		let observable = this.http.delete(url, {headers})
							.catch((error) => this.handleError(error))
							.share();

		observable.subscribe(() => this.observationsChanged.next(id));

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
