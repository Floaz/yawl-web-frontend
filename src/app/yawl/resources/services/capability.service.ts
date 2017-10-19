import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { OAuthService } from '../../../common/oauth/oauth.service';

import { YawlResourcesConfigService } from '../yawl-resources-config.service';

import { Capability } from '../entities/capability.entity';

import { AbstractResourceService } from './abstract-resource.service';



@Injectable()
export class CapabilityService extends AbstractResourceService<Capability> {

	constructor(private _http: Http,
				private _yawlResourcesConfigService : YawlResourcesConfigService,
				private _oauthService : OAuthService) {
		super("capability", "capabilities", _http, _yawlResourcesConfigService, _oauthService);
	}

}
