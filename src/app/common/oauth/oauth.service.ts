import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { OAuthConfigService } from './oauth-config.service';
import { OAuthToken } from './oauth-token';
import { TokenSessionData } from './token-session-data';




/**
 * The service for oauth key management.
 * 
 * @author Philipp Thomas
 */
@Injectable()
export class OAuthService {

	private storageKey = "oauth_token";

    private storage: Storage = sessionStorage;


	constructor(private http: Http,
				private configService: OAuthConfigService) {
	}


    public setStorage(newStorage: Storage) {
        this.storage = newStorage;
    }

    private getStoredToken() : OAuthToken {
		let retrievedObject = this.storage.getItem(this.storageKey);
		if(!retrievedObject) {
			return null;
		}

        return JSON.parse(retrievedObject);
    }

    private storeToken(item : OAuthToken) {
        return this.storage.setItem(this.storageKey, JSON.stringify(item));
    }

    private deleteStoredToken() {
        return this.storage.removeItem(this.storageKey);
    }


    public getAccessToken() : string {
        if(this.getStoredToken()) {
			return this.getStoredToken().accessToken;
		}
		return null;
    }


    public getExpirationTime() : number {
        if(this.getStoredToken()) {
			return this.getStoredToken().expiresAt;
		}
		return null;
    }


    public hasValidToken() : boolean {
		let token = this.getStoredToken();
        if(token) {
            var expiresAt = token['expiresAt'];
            var now = new Date();
            if(expiresAt && expiresAt < now.getTime()) {
                return false;
            }
            return true;
        }
        return false;
    }


    public getAuthorizationHeader() {
        return "Bearer " + this.getAccessToken();
    }


    public obtainToken(credentials) : Observable<any> {
		let headers = new Headers();
		headers.append("Content-Type", "application/x-www-form-urlencoded");
		headers.append("Authorization", "Basic " + btoa(this.configService.getClientId() + ":"));

		let data = {
			'client_id': this.configService.getClientId(),
			'grant_type': 'password',
			'username': credentials.username,
			'password': credentials.password
		};

		let payload = Object.keys(data).map((key) => {
			return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
		}).join('&');

		let obs = this.http.post(this.configService.getTokenUrl(), payload, {headers})
							.map(res => res.json())
							.catch((error) => this.handleError(error))
							.publishLast()
							.refCount();

		obs.subscribe(
			(response) => this.handleTokenRespone(response),
			() => {
				console.log("Could not obtain token!");
			});

		return obs;
    }


    public refreshToken() : Observable<any> {
		let headers = new Headers();
		headers.append("Content-Type", "application/x-www-form-urlencoded");
		headers.append("Authorization", "Basic " + btoa(this.configService.getClientId() + ":"));

		let token = this.getStoredToken();

		let data = {
			'client_id': this.configService.getClientId(),
			'grant_type': 'refresh_token',
			'access_token': token.accessToken,
			'refresh_token': token.refreshToken
		};

		let payload = Object.keys(data).map((key) => {
			return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
		}).join('&');

		let obs = this.http.post(this.configService.getTokenUrl(), payload, {headers})
							.map(res => res.json())
							.catch((error: any):any => {
								return Observable.throw('Error while refreshing OAuth token!');
							})
							.publishLast()
							.refCount();

		obs.subscribe((response) => this.handleTokenRespone(response));

		return obs;
    }


    public checkToken() : Observable<TokenSessionData> {
		if(!this.hasValidToken()) {
			return Observable.throw('Token not valid!');
		}

		let headers = new Headers();
		headers.append("Accept", "application/json");
		headers.append("Content-Type", "application/x-www-form-urlencoded");
		headers.append("Authorization", "Basic " + btoa(this.configService.getClientId() + ":"));

		let token = this.getStoredToken();

		let data = {
			'token': token.accessToken
		};

		let payload = Object.keys(data).map((key) => {
			return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
		}).join('&');

		return this.http.post(this.configService.getCheckTokenUrl(), payload, {headers})
							.map(res => res.json())
							.catch((error) => {
								return Observable.throw('Token not valid anymore!');
							});
    }


    public revokeToken() : Observable<any> {
		let headers = new Headers();
		headers.append("Authorization", this.getAuthorizationHeader());

		let obs = this.http.post(this.configService.getRevokeUrl(), {} , {headers})
				.publishLast()
				.refCount();

		obs.subscribe((response) => {
			console.log("Revoked token!");
		});

		this.deleteStoredToken();

		return obs;
    }


    private handleTokenRespone(response) {
		var expiresInMilliSeconds = parseInt(response['expires_in']) * 1000;
		var now = new Date();

		let token : OAuthToken = {
			accessToken: response['access_token'],
			refreshToken: response['refresh_token'],
			expiresAt: now.getTime() + expiresInMilliSeconds
		};

		this.storeToken(token);
    }


	private handleError(error: any) : Observable<any> {
		let errMsg = (error.message)
						? error.message
						: error.status ? `${error.status} - ${error.statusText}` : 'Server error';
		console.error(errMsg);
		return Observable.throw(errMsg);
	}


}
