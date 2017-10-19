
import { DashletTypeData } from './dashlet-type-data';

import { NotificationsDashlet } from './dashlets/notifications/notifications.dashlet';
import { NotificationsDashletSettingsComponent } from './dashlets/notifications/notifications-dashlet-settings.component';
import { ParticipantsTableDashlet } from './dashlets/participants-table/participants-table.dashlet';
import { ParticipantsTableDashletSettingsComponent } from './dashlets/participants-table/participants-table-dashlet-settings.component';
import { RunningCasesTableDashlet } from './dashlets/running-cases-table/running-cases-table.dashlet';
import { RunningCasesTableDashletSettingsComponent } from './dashlets/running-cases-table/running-cases-table-dashlet-settings.component';


export const DASHLET_TYPES : DashletTypeData[] = [
	{
		symbolicName: "participants-table",
		displayName : 'Participants Table',
		dashletComponent: ParticipantsTableDashlet,
		settingsComponent: ParticipantsTableDashletSettingsComponent,
		roles: ['ADMIN']
	},
	{
		symbolicName: "running-cases-table",
		displayName : 'Running Cases Table',
		dashletComponent: RunningCasesTableDashlet,
		settingsComponent: RunningCasesTableDashletSettingsComponent,
		roles: ['ADMIN']
	},
	{
		symbolicName: "notifications",
		displayName : 'Notifications',
		dashletComponent: NotificationsDashlet,
		settingsComponent: NotificationsDashletSettingsComponent,
		roles: ['USER']
	}
];
