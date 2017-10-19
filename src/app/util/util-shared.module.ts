import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TimeInputComponent } from './time-input.component';
import { DurationPipe } from './duration.pipe';
import { MappingPipe } from './mapping.pipe';
import { TimeDifferencePipe } from './timedifference.pipe';



@NgModule({
	declarations: [
		TimeInputComponent,
		DurationPipe,
		MappingPipe,
		TimeDifferencePipe
	],
	imports: [
		CommonModule,
		FormsModule
	],
	exports: [
		TimeInputComponent,
		DurationPipe,
		MappingPipe,
		TimeDifferencePipe
	]
})
export class UtilSharedModule { }

