import { Routes } from '@angular/router';

import { LoggedInGuard } from '../common/session/logged-in.guard';

import { DynFormPage }				from './dyn-form.page';


export const dynformRoutesConfig: Routes = [
	{
        path: 'dynform',
		pathMatch: 'full',
        component: DynFormPage,
        canActivate: [LoggedInGuard],
        data: {
            title: 'Dynform'
        }
    }
];
