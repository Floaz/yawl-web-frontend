import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { ConfigService } from '../common/config/config.service';


@Injectable()
export class DashboardConfigService {

	constructor(private configService: ConfigService) {
	}


	public getDashboardServiceUrl() : any {
		return "http://localhost:8081/api/";
	}

}
