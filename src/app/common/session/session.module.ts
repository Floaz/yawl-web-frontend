import { NgModule }      from '@angular/core';
import { CommonModule }		from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoggedInGuard }		from './logged-in.guard';
import { SessionService }		from './session.service';
import { OAuthService }			from '../oauth/oauth.service';
import { OAuthConfigService }	from '../oauth/oauth-config.service';

import { LoginFormPage }		from './login-form.page';

import { sessionRoutesConfig } from './session.routes';



@NgModule({
	declarations: [
		LoginFormPage
	],
	imports: [
		CommonModule,
		RouterModule.forChild(sessionRoutesConfig),
		FormsModule
	],
	providers: [
		LoggedInGuard,
		SessionService,
		OAuthService,
		OAuthConfigService
	],
})
export class SessionModule { }

