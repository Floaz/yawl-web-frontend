import { Pipe, PipeTransform } from '@angular/core';

import { DashletTypeService } from './dashlet-type.service'


@Pipe({name: 'dashlettypename'})
export class DashletTypeNamePipe implements PipeTransform {


	constructor(public dashletTypeService : DashletTypeService) {
	}


	transform(value : string): string {
		return this.dashletTypeService.getDashletTypeName(value);
	}

}
