import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { OAuthService } from '../../../common/oauth/oauth.service';

import { YawlResourcesConfigService } from '../yawl-resources-config.service';

import { OrgGroup } from '../entities/org-group.entity';

import { AbstractResourceService } from './abstract-resource.service';



@Injectable()
export class OrgGroupService extends AbstractResourceService<OrgGroup> {

	constructor(private _http: Http,
				private _yawlResourcesConfigService : YawlResourcesConfigService,
				private _oauthService : OAuthService) {
		super("group", "orgGroups", _http, _yawlResourcesConfigService, _oauthService);
	}

}
