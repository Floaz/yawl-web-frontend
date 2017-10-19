import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'timedifference'})
export class TimeDifferencePipe implements PipeTransform {

	transform(value: number): number {
		return Math.floor(Math.abs(Math.floor(Date.now() / 1000) - value));
	}

}
