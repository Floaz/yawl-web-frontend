import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UtilSharedModule }	from '../../util/util-shared.module';

import { AssetListComponent } from './lists/asset-list.component';
import { CapabilityListComponent } from './lists/capability-list.component';
import { CaseListComponent } from './lists/case-list.component';
import { OrgGroupListComponent } from './lists/org-group-list.component';
import { PositionListComponent } from './lists/position-list.component';
import { SpecificationListComponent } from './lists/specification-list.component';
import { RoleListComponent } from './lists/role-list.component';
import { UserListComponent } from './lists/user-list.component';
import { WorkItemListComponent } from './lists/work-item-list.component';




/**
 * This is the module that can be used by other modules
 * to show various list components.
 * 
 * @author Philipp Thomas
 */
@NgModule({
	declarations: [
        AssetListComponent,
		CapabilityListComponent,
		CaseListComponent,
		OrgGroupListComponent,
		PositionListComponent,
		SpecificationListComponent,
		RoleListComponent,
		UserListComponent,
		WorkItemListComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		UtilSharedModule
	],
	exports: [
        AssetListComponent,
		CapabilityListComponent,
		CaseListComponent,
		OrgGroupListComponent,
		PositionListComponent,
		SpecificationListComponent,
		RoleListComponent,
		UserListComponent,
		WorkItemListComponent
	]
})
export class YawlResourcesListsModule { }

