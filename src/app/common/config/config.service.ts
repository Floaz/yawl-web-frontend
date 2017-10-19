import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';


/**
 * The service for retrieving configuration.
 * 
 * @todo Return Observables.
 * 
 * @author Philipp Thomas
 */
@Injectable()
export class ConfigService {

	private url = 'config.json';

	private configuration : any = null;


	constructor(private http: Http) {
	}


	public get(key : string) : any {
		return this.configuration[key] || { };
	}


	public load() {
		return new Promise((resolve, reject) => {
			this.configuration = {

			};
			resolve(true);
//            this.http.get(this.url)
//					.map(res => res.json())
//					.catch((error: any):any => {
//						reject(false);
//						return Observable.throw('Error while loading configuration');
//					})
//					.subscribe((callResult) => {
//						this.configuration = callResult;
//						resolve(true);
//					});

        });
	}
}
