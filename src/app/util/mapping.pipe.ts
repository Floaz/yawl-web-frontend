import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'mapping'})
export class MappingPipe implements PipeTransform {

	transform(value: any, mapFunction: any): any {
		return mapFunction(value);
	}

}
