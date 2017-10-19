import { Injectable } from '@angular/core';

import { DashletTypeData } from './dashlet-type-data';
import { DASHLET_TYPES } from './dashlet-types';


@Injectable()
export class DashletTypeService {

	getAllDashletTypes() : DashletTypeData[] {
		return DASHLET_TYPES;
	}

	getDashletType(dashletType : String) : DashletTypeData {
		return DASHLET_TYPES.find(myObj => myObj.symbolicName == dashletType);
	}

	getDashletTypeName(dashletType : String) : any {
		let found = DASHLET_TYPES.find(myObj => myObj.symbolicName == dashletType);
		if(!found) {
			return dashletType;
		}
		return found.displayName;
	}

	getDashletComponent(dashletType : String) : any {
		let found = DASHLET_TYPES.find(myObj => myObj.symbolicName == dashletType);
		if(!found) {
			throw new Error('The type "'+dashletType+'" not found!');
		}
		return found.dashletComponent;
	}

	getDashletSettingsComponent(dashletType : String) : any {
		let found = DASHLET_TYPES.find(myObj => myObj.symbolicName == dashletType);
		if(!found) {
			throw new Error('The type "'+dashletType+'" not found!');
		}
		return found.settingsComponent;
	}

}
