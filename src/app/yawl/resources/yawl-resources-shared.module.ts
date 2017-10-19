import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialSharedModule }			from '../../common/layout/material-shared.module';

import { YawlResourcesListsModule }			from './yawl-resources-lists.module';

import { OrgGroupSelectInputComponent } from './components/org-group-select-input.component';
import { ParticipantsSelectionComponent } from './components/participants-selection.component';
import { PositionSelectInputComponent } from './components/position-select-input.component';
import { RoleSelectInputComponent } from './components/role-select-input.component';
import { SpecificationsSelectionComponent } from './components/specifications-selection.component';
import { TasksSelectionComponent } from './components/tasks-selection.component';
import { UsersSelectInputComponent } from './components/users-select-input.component';
import { ShowResourcePanelComponent } from './components/show-resource-panel.component';




/**
 * This is the module that can be used by other modules
 * to show various selection components.
 * 
 * @author Philipp Thomas
 */
@NgModule({
	declarations: [
		OrgGroupSelectInputComponent,
		ParticipantsSelectionComponent,
		PositionSelectInputComponent,
		RoleSelectInputComponent,
		SpecificationsSelectionComponent,
		TasksSelectionComponent,
		UsersSelectInputComponent,
		ShowResourcePanelComponent
	],
	imports: [
		CommonModule,
		FormsModule,
        YawlResourcesListsModule,
        MaterialSharedModule
	],
	exports: [
		OrgGroupSelectInputComponent,
		ParticipantsSelectionComponent,
		PositionSelectInputComponent,
		RoleSelectInputComponent,
		SpecificationsSelectionComponent,
		TasksSelectionComponent,
		UsersSelectInputComponent,
		ShowResourcePanelComponent
	]
})
export class YawlResourcesSharedModule { }

