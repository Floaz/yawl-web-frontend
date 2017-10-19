import { Pipe, PipeTransform } from '@angular/core';

import { ObserverRegistry } from './observer-registry.service'


@Pipe({name: 'observername'})
export class ObserverDisplayNamePipe implements PipeTransform {


	constructor(public observerRegistry : ObserverRegistry) {
	}


	transform(symbolicName : string): string {
		let observer = this.observerRegistry.getObserver(symbolicName);
		if(!observer) {
			return symbolicName;
		}
		return observer.displayName;
	}

}
