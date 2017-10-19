import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule }		from '@angular/router';

import { LayoutModule }		from '../common/layout/layout.module';
import { NotificationsSharedModule } from './notifications-shared.module';
import { UtilSharedModule }  from '../util/util-shared.module';
import { YawlResourcesSharedModule }  from '../yawl/resources/yawl-resources-shared.module';
import { MaterialSharedModule }			from '../common/layout/material-shared.module';


// Services
import { NotificationsService } from './notifications.service';
import { ObservationService } from './observations/observation.service';
import { ObserverRegistry } from './observations/observer-registry.service';
import { OBSERVERS } from './observers';

// Pages
import { NotificationsPage } from './notifications.page';
import { ObservationListPage } from './observations/observation-list.page';
import { ObservationCreatePage } from './observations/observation-create.page';
import { ObservationSettingsPage } from './observations/observation-settings.page';

// Observation Types
import { CaseWithoutWorkItemsObservationSettingsComponent } from './observers/case-without-work-items-observation-settings.component';
import { OldCaseObservationSettingsComponent } from './observers/old-case-observation-settings.component';
import { OldWorkItemObservationSettingsComponent } from './observers/old-work-item-observation-settings.component';
import { ParticipantAcceptedTooManyObservationSettingsComponent } from './observers/participant-accepted-too-many-observation-settings.component';
import { TimerRunsOutObservationSettingsComponent } from './observers/timer-runs-out-observation-settings.component';
import { UnofferedWorkItemObservationSettingsComponent } from './observers/unoffered-work-item-observation-settings.component';

import { notificationRoutesConfig } from './notifications.routes';


export function createObserverRegistry() {
    return new ObserverRegistry(OBSERVERS);
}




/**
 * This is the notifications module.
 * 
 * The notification module informs a user about
 * important things. The user can set up so-called observations,
 * which monitor for him and send notifications in specified cases.
 *
 * @author Philipp Thomas
 */
@NgModule({
	declarations: [
        // Pages
		NotificationsPage,
		ObservationListPage,
		ObservationCreatePage,
		ObservationSettingsPage,
		// Observation types
		CaseWithoutWorkItemsObservationSettingsComponent,
		OldCaseObservationSettingsComponent,
		OldWorkItemObservationSettingsComponent,
		ParticipantAcceptedTooManyObservationSettingsComponent,
		TimerRunsOutObservationSettingsComponent,
		UnofferedWorkItemObservationSettingsComponent
	],
	entryComponents: [
		CaseWithoutWorkItemsObservationSettingsComponent,
		OldCaseObservationSettingsComponent,
		OldWorkItemObservationSettingsComponent,
		ParticipantAcceptedTooManyObservationSettingsComponent,
		TimerRunsOutObservationSettingsComponent,
		UnofferedWorkItemObservationSettingsComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild(notificationRoutesConfig),
		LayoutModule,
		UtilSharedModule,
		NotificationsSharedModule,
        YawlResourcesSharedModule,
        MaterialSharedModule
	],
	providers: [
		NotificationsService,
		ObservationService,
		{ provide: ObserverRegistry, useValue: createObserverRegistry },
	],
})
export class NotificationsModule { }

