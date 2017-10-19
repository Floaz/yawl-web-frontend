import { Routes } from '@angular/router';

import { LoggedInGuard } from '../common/session/logged-in.guard';

import { NotificationsPage } from './notifications.page';
import { ObservationListPage } from './observations/observation-list.page';
import { ObservationCreatePage } from './observations/observation-create.page';
import { ObservationSettingsPage } from './observations/observation-settings.page';

export const notificationRoutesConfig: Routes = [
	{
        path: 'notifications',
		pathMatch: 'full',
        component: NotificationsPage,
        canActivate: [LoggedInGuard],
        data: {
            title: 'Notifications'
        }
    },
	{
        path: 'notifications/:id',
		pathMatch: 'full',
        component: NotificationsPage,
        canActivate: [LoggedInGuard],
        data: {
            title: 'Notifications'
        }
    },
	{
        path: 'observations',
		pathMatch: 'full',
        component: ObservationListPage,
        canActivate: [LoggedInGuard],
        data: {
            title: 'Observation'
        }
    },
	{
        path: 'observations/new',
		pathMatch: 'full',
        component: ObservationCreatePage,
        canActivate: [LoggedInGuard],
        data: {
            title: 'Create Observation'
        }
    },
	{
        path: 'observation/:id/settings',
		pathMatch: 'full',
        component: ObservationSettingsPage,
        canActivate: [LoggedInGuard],
        data: {
            title: 'Observation Settings'
        }
    }
];
