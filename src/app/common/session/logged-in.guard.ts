import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { SessionService } from './session.service';



@Injectable()
export class LoggedInGuard implements CanActivate {

	constructor(private sessionService: SessionService, private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if(this.sessionService.isLoggedIn()) {
			return true;
		}

		this.sessionService.redirectUrl = state.url;

		this.router.navigate(['/login']);

		return false;
	}
}
