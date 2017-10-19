import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { ConfigService } from '../config/config.service';


/**
 * The configuration service for oauth key management.
 * 
 * @todo Get urls from configuration service.
 * @todo Return Observables.
 * 
 * @author Philipp Thomas
 */
@Injectable()
export class OAuthConfigService {

	constructor(private configService: ConfigService) {
	}


	public getClientId() : any {
        return 'yawl-web-admin';
//		try {
//			return this.configService.get('oauth').clientId;
//		}
//		catch(e){
//		}
	}


	public getTokenUrl() : any {
		return 'http://localhost:8080/auth/oauth/token';
	}


	public getCheckTokenUrl() : any {
		return 'http://localhost:8080/auth/oauth/check_token';
	}


	public getRevokeUrl() : any {
		return 'http://localhost:8080/auth/oauth/revoke-token';
	}
}
