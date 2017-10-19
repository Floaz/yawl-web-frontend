import { Routes } from '@angular/router';

import { LoggedInGuard } from '../common/session/logged-in.guard';

import { DashboardPage } from './dashboard.page';
import { DashboardListPage } from './dashboard-list.page';
import { DashletSettingsPage } from './dashlet-settings.page';


export const dashboardRoutesConfig: Routes = [
	{
        path: 'dashboard',
		pathMatch: 'full',
        component: DashboardPage,
        canActivate: [LoggedInGuard],
        data: {
            title: 'Dashboard'
        }
    },
	{
        path: 'dashboard/:id',
		pathMatch: 'full',
        component: DashboardPage,
        canActivate: [LoggedInGuard],
        data: {
            title: 'Dashboard'
        }
    },
	{
        path: 'manage/dashboards',
		pathMatch: 'full',
        component: DashboardListPage,
        canActivate: [LoggedInGuard],
        data: {
            title: 'List of dashboards'
        }
    },
	{
        path: 'dashlet/:id/settings',
		pathMatch: 'full',
        component: DashletSettingsPage,
        canActivate: [LoggedInGuard],
        data: {
            title: 'Dashlet Settings'
        }
    }
];
