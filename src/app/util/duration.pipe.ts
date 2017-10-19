import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'duration'})
export class DurationPipe implements PipeTransform {

	transform(value: number): string {
		let seconds = value % 60;
		let minutes = Math.floor(value / 60);
		let hours = Math.floor(minutes / 60);
		minutes = minutes % 60;
		let days = Math.floor(hours / 24);
		hours = hours % 24;

		if(days != 0) {
			return days + "d " + hours + "h";
		}
		else if(minutes == 0 && hours == 0) {
			return seconds + "secs";
		}
		else if(hours == 0) {
			return minutes + "m " + seconds + "s";
		}
		else {
			return hours + "h " + minutes + "m";
		}
	}

}
