import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { OAuthService } from '../oauth/oauth.service';
import { TokenSessionData } from '../oauth/token-session-data';


/**
 * The service for session management.
 * 
 * @author Philipp Thomas
 */
@Injectable()
export class SessionService {

	private loggedIn = false;
	private username = "";
	private authorities = [];

	private sessionCheckInterval = null;
	private tokenRefreshTimer = null;

	redirectUrl: string;



	constructor(private oauthService: OAuthService,
				private http: Http) {
	}


	startIntervalSessionCheck() {
		if(!this.sessionCheckInterval) {
			this.sessionCheckInterval = setInterval(() => {
				this.checkLoggedIn();
			}, 5000);
		}
	}


	stopIntervalSessionCheck() {
		if(this.sessionCheckInterval) {
			clearInterval(this.sessionCheckInterval);
			this.sessionCheckInterval = null;
		}
	}


	isIntervalSessionCheckRunning() : boolean {
		return this.sessionCheckInterval != null;
	}


	startTokenRefreshTimer() {
		if(!this.tokenRefreshTimer) {
			var now = new Date();
			var bufferInMs = 40*1000; // A buffer of 40 seconds before expiration.
			let timeout = this.oauthService.getExpirationTime() - now.getTime() - bufferInMs;

			this.tokenRefreshTimer = setTimeout(() => {
				this.tokenRefreshTimer = null;
				this.oauthService.refreshToken().subscribe(() => {
					this.startTokenRefreshTimer()
				});
			}, timeout);
		}
	}


	stopTokenRefreshTimer() {
		if(this.tokenRefreshTimer) {
			clearInterval(this.tokenRefreshTimer);
			this.tokenRefreshTimer = null;
		}
	}


	isTokenRefreshTimerRunning() : boolean {
		return this.tokenRefreshTimer != null;
	}


	checkLoggedIn(callback?) {
		this.oauthService.checkToken().subscribe(
			(sessionData: TokenSessionData) => {
				this.authorities = sessionData.authorities;
				if(!this.hasAuthoritiy("ROLE_ADMIN")) {
					this.authorities = [];
					callback && callback();
					return;
				}
				this.loggedIn = true;
				this.username = sessionData.user_name;
				this.startIntervalSessionCheck();
				this.startTokenRefreshTimer();
				callback && callback();
			},
			(error) => {
				this.loggedIn = false;
				this.username = "";
				this.authorities = [];
				this.stopIntervalSessionCheck();
				this.stopTokenRefreshTimer();
				callback && callback();
			});
	}


	login(username, password) : Observable<any> {
		let credentials = { username, password };

		let observable = this.oauthService.obtainToken(credentials);

		observable.subscribe(
			() => {
				this.loggedIn = true;
				this.username = "";
				this.authorities = [];
				this.startIntervalSessionCheck();
				this.startTokenRefreshTimer();
			},
			() => {
				console.log("Could not login!");
			});

		return observable;
	}


	logout() : Observable<any> {
		this.loggedIn = false;
		this.username = "";
		this.authorities = [];
		this.stopIntervalSessionCheck();
		this.stopTokenRefreshTimer();

		let observable = this.oauthService.revokeToken();

		return observable;
	}


	public isLoggedIn() {
		return this.loggedIn && this.oauthService.hasValidToken();
	}


	public getUsername() {
		return this.username;
	}


	public getAuthorities() : String[] {
		return this.authorities;
	}


	public hasAuthoritiy(authority : String) : boolean {
		for (let entry of this.authorities) {
			if(entry == authority) {
				return true;
			}
		}
		return false;
	}


	public hasRole(role : String) : boolean {
		for (let authority of this.authorities) {
			if(authority == "ROLE_"+role) {
				return true;
			}
		}
		return false;
	}
}
