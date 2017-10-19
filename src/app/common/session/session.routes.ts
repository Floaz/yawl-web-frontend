import { Routes } from '@angular/router';

import { LoggedInGuard } from './logged-in.guard';
import { LoginFormPage } from './login-form.page';



/**
 * The configuration of the routes for session management.
 * 
 * @author Philipp Thomas
 */
export const sessionRoutesConfig: Routes = [
	{
        path: 'login',
		pathMatch: 'full',
        component: LoginFormPage
    }
];
