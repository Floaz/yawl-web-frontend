import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { OAuthService } from '../../../common/oauth/oauth.service';

import { YawlResourcesConfigService } from '../yawl-resources-config.service';

import { Position } from '../entities/position.entity';

import { AbstractResourceService } from './abstract-resource.service';



@Injectable()
export class PositionService extends AbstractResourceService<Position> {

	constructor(private _http: Http,
				private _yawlResourcesConfigService : YawlResourcesConfigService,
				private _oauthService : OAuthService) {
		super("position", "positions", _http, _yawlResourcesConfigService, _oauthService);
	}

}
