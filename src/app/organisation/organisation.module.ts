import { NgModule }			from '@angular/core';
import { CommonModule }		from '@angular/common';
import { FormsModule }		from '@angular/forms';
import { RouterModule }		from '@angular/router';

import { LayoutModule }					from '../common/layout/layout.module';
import { MaterialSharedModule }			from '../common/layout/material-shared.module';
import { UtilSharedModule }				from '../util/util-shared.module';
import { YawlResourcesSharedModule }	from '../yawl/resources/yawl-resources-shared.module';
import { YawlResourcesListsModule }		from '../yawl/resources/yawl-resources-lists.module';

import { AssetsListPage }				from './assets/assets-list.page';
import { AssetAddPage }					from './assets/asset-add.page';
import { AssetFormComponent }			from './assets/asset-form.component';
import { AssetCategoryAddPage }			from './assets/asset-category-add.page';
import { AssetCategoryFormComponent }	from './assets/asset-category-form.component';
import { AssetSubCategoryAddPage }		from './assets/asset-sub-category-add.page';

import { CapabilitiesListPage }				from './capabilities/capabilities-list.page';
import { CapabilityAddPage }				from './capabilities/capability-add.page';
import { CapabilityEditPage }				from './capabilities/capability-edit.page';
import { CapabilityFormComponent }			from './capabilities/capability-form.component';
import { CapabilityUsersPanelComponent }	from './capabilities/capability-users-panel.component';
import { CapabilityShowPage }				from './capabilities/capability-show.page';

import { CaseListPage }				from './cases/case-list.page';

import { OrgGroupsListPage }		from './orggroups/org-groups-list.page';
import { OrgGroupAddPage }			from './orggroups/org-group-add.page';
import { OrgGroupEditPage }			from './orggroups/org-group-edit.page';
import { OrgGroupFormComponent }	from './orggroups/org-group-form.component';
import { OrgGroupShowPage }			from './orggroups/org-group-show.page';
import { OrgGroupChildsPanelComponent }		from './orggroups/org-group-childs-panel.component';
import { OrgGroupPositionsPanelComponent }	from './orggroups/org-group-positions-panel.component';

import { PositionsListPage }			from './positions/positions-list.page';
import { PositionAddPage }				from './positions/position-add.page';
import { PositionEditPage }				from './positions/position-edit.page';
import { PositionFormComponent }		from './positions/position-form.component';
import { PositionUsersPanelComponent }	from './positions/position-users-panel.component';
import { PositionShowPage }				from './positions/position-show.page';
import { PositionChildsPanelComponent }	from './positions/position-childs-panel.component';

import { RolesListPage }			from './roles/roles-list.page';
import { RoleAddPage }				from './roles/role-add.page';
import { RoleChildsPanelComponent }	from './roles/role-childs-panel.component';
import { RoleEditPage }				from './roles/role-edit.page';
import { RoleFormComponent }		from './roles/role-form.component';
import { RoleUsersPanelComponent }	from './roles/role-users-panel.component';
import { RoleShowPage }				from './roles/role-show.page';

import { SpecificationsListPage }	from './specifications/specifications-list.page';
import { SpecificationShowPage }	from './specifications/specification-show.page';
import { SpecificationUploadPage }	from './specifications/specification-upload.page';

import { UsersListPage }			from './users/users-list.page';
import { UserAddPage }				from './users/user-add.page';
import { UserEditPage }				from './users/user-edit.page';
import { UserEditPasswordPage }		from './users/user-edit-password.page';
import { UserShowPage }				from './users/user-show.page';
import { UserAddFormComponent }		from './users/user-add-form.component';
import { UserDetailsComponent }		from './users/user-details.component';
import { UserProfileFormComponent } from './users/user-profile-form.component';
import { UserCapabilitiesPanelComponent	}	from './users/user-capabilities-panel.component';
import { UserPositionsPanelComponent }		from './users/user-positions-panel.component';
import { UserRolesPanelComponent }			from './users/user-roles-panel.component';
import { UserWorkItemsPanelComponent }		from './users/user-work-items-panel.component';

import { WorkItemEditDocumentationPage }				from './workitems/work-item-edit-documentation.page';
import { WorkItemListPage }								from './workitems/work-item-list.page';
import { WorkItemParticipantsPanelComponent }			from './workitems/work-item-participants-panel.component';
import { WorkItemShowPage }								from './workitems/work-item-show.page';
import { WorkItemReofferPage }							from './workitems/work-item-reoffer.page';

// Routes
import { organisationRoutesConfig }	from './organisation.routes';



/**
 * This is the organisation module.
 * 
 * The organisation module contains all components to
 * administrate the resources of YAWL like assets, users
 * and work items.
 * 
 * @author Philipp Thomas
 */
@NgModule({
	declarations: [
		AssetsListPage,
		AssetAddPage,
		AssetFormComponent,
		AssetCategoryAddPage,
		AssetCategoryFormComponent,
		AssetSubCategoryAddPage,
		CapabilitiesListPage,
		CapabilityAddPage,
		CapabilityEditPage,
		CapabilityFormComponent,
		CapabilityUsersPanelComponent,
		CapabilityShowPage,
		CaseListPage,
		OrgGroupsListPage,
		OrgGroupAddPage,
		OrgGroupEditPage,
		OrgGroupFormComponent,
		OrgGroupShowPage,
		OrgGroupChildsPanelComponent,
		OrgGroupPositionsPanelComponent,
		PositionsListPage,
		PositionAddPage,
		PositionEditPage,
		PositionFormComponent,
		PositionUsersPanelComponent,
		PositionShowPage,
		PositionChildsPanelComponent,
		RolesListPage,
		RoleAddPage,
		RoleChildsPanelComponent,
		RoleEditPage,
		RoleFormComponent,
		RoleUsersPanelComponent,
		RoleShowPage,
		SpecificationsListPage,
		SpecificationShowPage,
		SpecificationUploadPage,
		UsersListPage,
		UserAddPage,
		UserEditPage,
		UserEditPasswordPage,
		UserShowPage,
		UserAddFormComponent,
		UserDetailsComponent,
		UserProfileFormComponent,
		UserCapabilitiesPanelComponent,
		UserPositionsPanelComponent,
		UserRolesPanelComponent,
		UserWorkItemsPanelComponent,
		WorkItemEditDocumentationPage,
		WorkItemListPage,
		WorkItemParticipantsPanelComponent,
		WorkItemShowPage,
		WorkItemReofferPage
	],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild(organisationRoutesConfig),
        LayoutModule,
        MaterialSharedModule,
		UtilSharedModule,
		YawlResourcesSharedModule,
		YawlResourcesListsModule
	]
})
export class OrganisationModule { }

