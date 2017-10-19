
import { Observer } from './observations/observer';

import { CaseWithoutWorkItemsObservationSettingsComponent } from './observers/case-without-work-items-observation-settings.component';
import { OldCaseObservationSettingsComponent } from './observers/old-case-observation-settings.component';
import { OldWorkItemObservationSettingsComponent } from './observers/old-work-item-observation-settings.component';
import { ParticipantAcceptedTooManyObservationSettingsComponent } from './observers/participant-accepted-too-many-observation-settings.component';
import { TimerRunsOutObservationSettingsComponent } from './observers/timer-runs-out-observation-settings.component';
import { UnofferedWorkItemObservationSettingsComponent } from './observers/unoffered-work-item-observation-settings.component';


export const OBSERVERS : Observer[] = [
	{
		symbolicName: "old-work-item",
		displayName : 'Old work item',
		settingsComponent: OldWorkItemObservationSettingsComponent,
		defaultSettings: {
			filterMode: 'whitelist',
			filterTasks: [],
			threshold: 604800,
			priority: 'WARN',
			notificationTitle: 'DEFAULT',
			notificationSpecifiedTitle: ''
		},
		metadataKeyNames: {
			'workItemId': 'Work Item',
			'specificationName': 'Specification',
			'workItemCreationDate': 'Creationdate'
		}
	},
	{
		symbolicName: "unoffered-work-item",
		displayName : 'Unoffered work item',
		settingsComponent: UnofferedWorkItemObservationSettingsComponent,
		defaultSettings: {
			filterMode: 'whitelist',
			filterTasks: [],
			priority: 'INFO',
			notificationTitle: 'DEFAULT',
			notificationSpecifiedTitle: ''
		},
		metadataKeyNames: {
			'workItemId': 'Work Item',
			'specificationName': 'Specification'
		}
	},
	{
		symbolicName: "participant-accepted-too-many",
		displayName : 'Participant accepted too many work items',
		settingsComponent: ParticipantAcceptedTooManyObservationSettingsComponent,
		defaultSettings: {
			filterMode: 'whitelist',
			filterParticipants: [],
			threshold: 12,
			priority: 'INFO',
			notificationTitle: 'DEFAULT',
			notificationSpecifiedTitle: ''
		},
		metadataKeyNames: {
			'participantUsername': 'Username',
			'participantName': 'Participant'
		}
	},
	{
		symbolicName: "case-without-work-items",
		displayName : 'Case without work items',
		settingsComponent: CaseWithoutWorkItemsObservationSettingsComponent,
		defaultSettings: {
			filterMode: 'whitelist',
			filterSpecifications: [],
			priority: 'WARN',
			notificationTitle: 'DEFAULT',
			notificationSpecifiedTitle: ''
		},
		metadataKeyNames: {
			'caseId': 'Case-ID',
			'specificationName': 'Specification'
		}
	},
	{
		symbolicName: "timer-runs-out",
		displayName : 'Timer runs out',
		settingsComponent: TimerRunsOutObservationSettingsComponent,
		defaultSettings: {
			filterMode: 'whitelist',
			filterTasks: [],
			threshold: 3600,
			priority: 'WARN',
			notificationTitle: 'DEFAULT',
			notificationSpecifiedTitle: ''
		},
		metadataKeyNames: {
			'caseId': 'Case-ID',
			'taskName': 'Task',
			'specificationName': 'Specification'
		}
	}

//
// The following observation type could not be realised,
// because i can't get the data of cases.
//
//	{
//		symbolicName: "old-case",
//		displayName : 'Case is too old',
//		settingsComponent: OldCaseObservationSettingsComponent,
//		defaultSettings: {
//			filterMode: 'whitelist',
//			filterSpecifications: [],
//			threshold: 604800,
//			priority: 'WARN',
//			notificationTitle: 'DEFAULT',
//			notificationSpecifiedTitle: ''
//		},
//		metadataKeyNames: {
//			'caseId': 'Case-ID',
//			'specificationName': 'Specification'
//		}
//	}
];
