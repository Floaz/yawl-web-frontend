import { NgModule }      from '@angular/core';

import { AssetService }			        from './services/asset.service';
import { AssetCategoryService }			from './services/asset-category.service';
import { CapabilityService }			from './services/capability.service';
import { CaseService }					from './services/case.service';
import { ParticipantService }			from './services/participant.service';
import { OrgGroupService }				from './services/org-group.service';
import { PositionService }				from './services/position.service';
import { RoleService }					from './services/role.service';
import { SpecificationService }			from './services/specification.service';
import { UserService }					from './services/user.service';
import { UserCapabilityMappingService }	from './services/user-capability-mapping.service';
import { UserPositionMappingService }	from './services/user-position-mapping.service';
import { UserRoleMappingService }		from './services/user-role-mapping.service';
import { WorkItemService }				from './services/work-item.service';

import { YawlResourcesConfigService }	from './yawl-resources-config.service';



/**
 * This is the module that should be importet
 * by the root app component as it provides resource services.
 * 
 * @author Philipp Thomas
 */
@NgModule({
	providers: [
        AssetService,
        AssetCategoryService,
		CapabilityService,
		CaseService,
		ParticipantService,
		OrgGroupService,
		PositionService,
		RoleService,
		SpecificationService,
		UserService,
		UserCapabilityMappingService,
		UserPositionMappingService,
		UserRoleMappingService,
		WorkItemService,
		YawlResourcesConfigService
	]
})
export class YawlResourcesModule { }

