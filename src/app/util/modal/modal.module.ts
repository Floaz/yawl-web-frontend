import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }	from '@angular/forms';

import { ModalPlaceholderComponent } from './modal-placeholder.component';
import { ModalService } from './modal.service';


@NgModule({
	declarations: [
		ModalPlaceholderComponent
	],
	imports: [
		CommonModule,
		FormsModule
	],
	providers: [
		ModalService
	],
	exports: [
		ModalPlaceholderComponent
	]
})
export class ModalModule { }

