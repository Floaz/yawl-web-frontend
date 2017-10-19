import { NgModule }			from '@angular/core';
import { CommonModule }		from '@angular/common';
import { FormsModule }		from '@angular/forms';
import { RouterModule }		from '@angular/router';

import { LayoutModule }		from '../common/layout/layout.module';
import { NotificationsSharedModule } from '../notifications/notifications-shared.module';
import { UtilSharedModule }  from '../util/util-shared.module';
import { YawlResourcesSharedModule }  from '../yawl/resources/yawl-resources-shared.module';
import { MaterialSharedModule }			from '../common/layout/material-shared.module';

// Pages
import { DashboardPage } from './dashboard.page';
import { DashboardListPage } from './dashboard-list.page';
import { DashletSettingsPage } from './dashlet-settings.page';

// Components
import { DashletPanelComponent } from './dashlet-panel.component';
import { DashletAddPanelComponent } from './dashlet-add-panel.component';

// Pipes
import { DashletTypeNamePipe } from './dashlet-type-name.pipe';

// Dashlets
import { NotificationsDashlet } from './dashlets/notifications/notifications.dashlet';
import { NotificationsDashletSettingsComponent } from './dashlets/notifications/notifications-dashlet-settings.component';
import { ParticipantsTableDashlet } from './dashlets/participants-table/participants-table.dashlet';
import { ParticipantsTableDashletSettingsComponent } from './dashlets/participants-table/participants-table-dashlet-settings.component';
import { RunningCasesTableDashlet } from './dashlets/running-cases-table/running-cases-table.dashlet';
import { RunningCasesTableDashletSettingsComponent } from './dashlets/running-cases-table/running-cases-table-dashlet-settings.component';

// Dashboard layouts
import { FixedColumnLayoutComponent } from './layout/fixed-column-layout.component';
import { LayoutSelectionComponent } from './layout/layout-selection.component';
import { DraggableDirective } from './layout/draggable.directive';
import { DroppableDirective } from './layout/droppable.directive';
import { DragChildDirective } from './layout/dragchild.directive';

// Services
import { DashboardService } from './dashboard.service';
import { DashboardConfigService } from './dashboard-config.service';
import { DashletTypeService } from './dashlet-type.service';
import { DashletService } from './dashlet.service';

import { dashboardRoutesConfig } from './dashboard.routes';



/**
 * This is the dashboard module.
 * 
 * The dashboard allows the user to view important information.
 * The user can customize and move all so-called dashlets.
 *
 * @author Philipp Thomas
 */
@NgModule({
	declarations: [
		// Pages
		DashboardPage,
		DashboardListPage,
		DashletSettingsPage,
        // Components
		DashletAddPanelComponent,
		DashletPanelComponent,
		// Pipes
		DashletTypeNamePipe,
		// Dashlets
		NotificationsDashlet,
		NotificationsDashletSettingsComponent,
		ParticipantsTableDashlet,
		ParticipantsTableDashletSettingsComponent,
		RunningCasesTableDashlet,
		RunningCasesTableDashletSettingsComponent,
		// Layouts
		FixedColumnLayoutComponent,
		LayoutSelectionComponent,
		DraggableDirective,
		DroppableDirective,
		DragChildDirective
	],
	entryComponents: [
		NotificationsDashlet,
		NotificationsDashletSettingsComponent,
		ParticipantsTableDashlet,
		ParticipantsTableDashletSettingsComponent,
		RunningCasesTableDashlet,
		RunningCasesTableDashletSettingsComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild(dashboardRoutesConfig),
		LayoutModule,
		NotificationsSharedModule,
		UtilSharedModule,
        YawlResourcesSharedModule,
        MaterialSharedModule
	],
	providers: [
		DashboardService,
		DashboardConfigService,
		DashletTypeService,
		DashletService
	],
})
export class DashboardModule { }

