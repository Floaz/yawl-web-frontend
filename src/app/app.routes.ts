import { Routes } from '@angular/router';

import { PageNotFoundPage } from './common/layout/page-not-found.page';

import { LoggedInGuard } from './common/session/logged-in.guard';



/**
 * The configuration of the routes that are default.
 * 
 * Note: Routes for other components are in other modules.
 * 
 * @author Philipp Thomas
 */
export const routesConfig: Routes = [
	{
        path: '',
		pathMatch: 'full',
        redirectTo: 'workitems'
    },
    {
        path: '**',
		pathMatch: 'full',
        component: PageNotFoundPage
    }
];
