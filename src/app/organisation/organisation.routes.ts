import { Routes } from '@angular/router';

import { LoggedInGuard } from '../common/session/logged-in.guard';

import { AssetsListPage }		    from './assets/assets-list.page';
import { AssetAddPage }				from './assets/asset-add.page';
import { AssetCategoryAddPage }		from './assets/asset-category-add.page';
import { AssetSubCategoryAddPage }		from './assets/asset-sub-category-add.page';

import { CapabilitiesListPage }		from './capabilities/capabilities-list.page';
import { CapabilityAddPage }		from './capabilities/capability-add.page';
import { CapabilityEditPage }		from './capabilities/capability-edit.page';
import { CapabilityShowPage }		from './capabilities/capability-show.page';

import { CaseListPage }				from './cases/case-list.page';

import { OrgGroupsListPage }		from './orggroups/org-groups-list.page';
import { OrgGroupAddPage }			from './orggroups/org-group-add.page';
import { OrgGroupEditPage }			from './orggroups/org-group-edit.page';
import { OrgGroupShowPage }			from './orggroups/org-group-show.page';

import { PositionsListPage }		from './positions/positions-list.page';
import { PositionAddPage }			from './positions/position-add.page';
import { PositionEditPage }			from './positions/position-edit.page';
import { PositionShowPage }			from './positions/position-show.page';

import { RolesListPage }			from './roles/roles-list.page';
import { RoleAddPage }				from './roles/role-add.page';
import { RoleEditPage }				from './roles/role-edit.page';
import { RoleShowPage }				from './roles/role-show.page';

import { SpecificationsListPage }	from './specifications/specifications-list.page';
import { SpecificationShowPage }	from './specifications/specification-show.page';
import { SpecificationUploadPage }	from './specifications/specification-upload.page';

import { UsersListPage }			from './users/users-list.page';
import { UserAddPage }				from './users/user-add.page';
import { UserEditPage }				from './users/user-edit.page';
import { UserEditPasswordPage }		from './users/user-edit-password.page';
import { UserShowPage }				from './users/user-show.page';

import { WorkItemEditDocumentationPage }	from './workitems/work-item-edit-documentation.page';
import { WorkItemListPage }					from './workitems/work-item-list.page';
import { WorkItemShowPage }					from './workitems/work-item-show.page';
import { WorkItemReofferPage }				from './workitems/work-item-reoffer.page';


export const organisationRoutesConfig: Routes = [
	{
        path: 'assets',
		pathMatch: 'full',
        component: AssetsListPage,
        canActivate: [LoggedInGuard],
        data: {
            title: 'Manage Assets'
        }
    },
	{
        path: 'asset/new',
		pathMatch: 'full',
        component: AssetAddPage,
        canActivate: [LoggedInGuard],
        data: {
            title: 'New Asset'
        }
    },
	{
        path: 'asset/category/new',
		pathMatch: 'full',
        component: AssetCategoryAddPage,
        canActivate: [LoggedInGuard],
        data: {
            title: 'New Asset Category'
        }
    },
	{
        path: 'asset/subcategory/new',
		pathMatch: 'full',
        component: AssetSubCategoryAddPage,
        canActivate: [LoggedInGuard],
        data: {
            title: 'New Asset Sub Category'
        }
    },
	{
        path: 'capabilities',
		pathMatch: 'full',
        component: CapabilitiesListPage,
        canActivate: [LoggedInGuard],
        data: {
            title: 'Manage Capabilities'
        }
    },
	{
        path: 'capability/new',
		pathMatch: 'full',
        component: CapabilityAddPage,
        canActivate: [LoggedInGuard],
        data: {
            title: 'Add Capability'
        }
    },
	{
        path: 'capability/:id',
		pathMatch: 'full',
        component: CapabilityShowPage,
        canActivate: [LoggedInGuard],
        data: {
            title: 'Show Capability'
        }
    },
	{
        path: 'capability/:id/edit',
		pathMatch: 'full',
        component: CapabilityEditPage,
        canActivate: [LoggedInGuard],
        data: {
            title: 'Edit Capability'
        }
    },
	{
        path: 'cases',
		pathMatch: 'full',
        component: CaseListPage,
        canActivate: [LoggedInGuard],
        data: {
            title: 'Manage cases'
        }
    },
	{
        path: 'cases/:id/:version',
		pathMatch: 'full',
        component: CaseListPage,
        canActivate: [LoggedInGuard],
        data: {
            title: 'Manage cases'
        }
    },
	{
        path: 'groups',
		pathMatch: 'full',
        component: OrgGroupsListPage,
        canActivate: [LoggedInGuard],
        data: {
            title: 'Manage groups'
        }
    },
	{
        path: 'group/new',
		pathMatch: 'full',
        component: OrgGroupAddPage,
        canActivate: [LoggedInGuard],
        data: {
            title: 'Add group'
        }
    },
	{
        path: 'group/:id',
		pathMatch: 'full',
        component: OrgGroupShowPage,
        canActivate: [LoggedInGuard],
        data: {
            title: 'Show group'
        }
    },
	{
        path: 'group/:id/edit',
		pathMatch: 'full',
        component: OrgGroupEditPage,
        canActivate: [LoggedInGuard],
        data: {
            title: 'Edit group'
        }
    },
	{
        path: 'positions',
		pathMatch: 'full',
        component: PositionsListPage,
        canActivate: [LoggedInGuard],
        data: {
            title: 'Manage positions'
        }
    },
	{
        path: 'position/new',
		pathMatch: 'full',
        component: PositionAddPage,
        canActivate: [LoggedInGuard],
        data: {
            title: 'Add position'
        }
    },
	{
        path: 'position/:id',
		pathMatch: 'full',
        component: PositionShowPage,
        canActivate: [LoggedInGuard],
        data: {
            title: 'Show Position'
        }
    },
	{
        path: 'position/:id/edit',
		pathMatch: 'full',
        component: PositionEditPage,
        canActivate: [LoggedInGuard],
        data: {
            title: 'Edit position'
        }
    },
	{
        path: 'roles',
		pathMatch: 'full',
        component: RolesListPage,
        canActivate: [LoggedInGuard],
        data: {
            title: 'Manage Roles'
        }
    },
	{
        path: 'role/new',
		pathMatch: 'full',
        component: RoleAddPage,
        canActivate: [LoggedInGuard],
        data: {
            title: 'Add Role'
        }
    },
	{
        path: 'role/:id',
		pathMatch: 'full',
        component: RoleShowPage,
        canActivate: [LoggedInGuard],
        data: {
            title: 'Show Role'
        }
    },
	{
        path: 'role/:id/edit',
		pathMatch: 'full',
        component: RoleEditPage,
        canActivate: [LoggedInGuard],
        data: {
            title: 'Edit Role'
        }
    },
	{
        path: 'specifications',
		pathMatch: 'full',
        component: SpecificationsListPage,
        canActivate: [LoggedInGuard],
        data: {
            title: 'Manage specifications'
        }
    },
	{
        path: 'specification/:id/:version',
		pathMatch: 'full',
        component: SpecificationShowPage,
        canActivate: [LoggedInGuard],
        data: {
            title: 'Show specification'
        }
    },
	{
        path: 'specification/upload',
		pathMatch: 'full',
        component: SpecificationUploadPage,
        canActivate: [LoggedInGuard],
        data: {
            title: 'Upload specification'
        }
    },
	{
        path: 'users',
		pathMatch: 'full',
        component: UsersListPage,
        canActivate: [LoggedInGuard],
        data: {
            title: 'Manage Users'
        }
    },
	{
        path: 'user/new',
		pathMatch: 'full',
        component: UserAddPage,
        canActivate: [LoggedInGuard],
        data: {
            title: 'Add User'
        }
    },
	{
        path: 'user/:id',
		pathMatch: 'full',
        component: UserShowPage,
        canActivate: [LoggedInGuard],
        data: {
            title: 'Manage User'
        }
    },
	{
        path: 'user/:id/edit',
		pathMatch: 'full',
        component: UserEditPage,
        canActivate: [LoggedInGuard],
        data: {
            title: 'Edit User'
        }
    },
	{
        path: 'user/:id/editpassword',
		pathMatch: 'full',
        component: UserEditPasswordPage,
        canActivate: [LoggedInGuard],
        data: {
            title: 'Change password'
        }
    },
	{
        path: 'workitems',
		pathMatch: 'full',
        component: WorkItemListPage,
        canActivate: [LoggedInGuard],
        data: {
            title: 'Manage Work Items'
        }
    },
	{
        path: 'workitem/:id',
		pathMatch: 'full',
        component: WorkItemShowPage,
        canActivate: [LoggedInGuard],
        data: {
            title: 'Show Work Item'
        }
    },
	{
        path: 'workitem/:id/editdocumentation',
		pathMatch: 'full',
        component: WorkItemEditDocumentationPage,
        canActivate: [LoggedInGuard],
        data: {
            title: 'Edit documentation of work item'
        }
    },
	{
        path: 'workitem/:id/reoffer',
		pathMatch: 'full',
        component: WorkItemReofferPage,
        canActivate: [LoggedInGuard],
        data: {
            title: 'Reoffer work item'
        }
    }
];
