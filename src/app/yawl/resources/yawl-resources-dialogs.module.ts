import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialSharedModule }			from '../../common/layout/material-shared.module';

import { YawlResourcesListsModule }			from './yawl-resources-lists.module';

import { CapabilitySelectDialogComponent }	from './dialogs/capability-select-dialog.component';
import { OrgGroupSelectDialogComponent }	from './dialogs/org-group-select-dialog.component';
import { PositionSelectDialogComponent }	from './dialogs/position-select-dialog.component';
import { RoleSelectDialogComponent }		from './dialogs/role-select-dialog.component';
import { UserSelectDialogComponent }		from './dialogs/user-select-dialog.component';



/**
 * This is the module that can be used by other modules
 * to show various select dialogs.
 * 
 * @author Philipp Thomas
 */
@NgModule({
	declarations: [
		CapabilitySelectDialogComponent,
		OrgGroupSelectDialogComponent,
		PositionSelectDialogComponent,
		RoleSelectDialogComponent,
		UserSelectDialogComponent
	],
	imports: [
		CommonModule,
		FormsModule,
        YawlResourcesListsModule,
        MaterialSharedModule
	],
	exports: [
		CapabilitySelectDialogComponent,
		OrgGroupSelectDialogComponent,
		PositionSelectDialogComponent,
		RoleSelectDialogComponent,
		UserSelectDialogComponent
	]
})
export class YawlResourcesDialogsModule { }

