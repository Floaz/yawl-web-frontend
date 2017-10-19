import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialSharedModule }			from '../../common/layout/material-shared.module';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';



@NgModule({
	declarations: [
		ConfirmationDialogComponent
	],
	imports: [
		CommonModule,
        FormsModule,
        MaterialSharedModule
	],
	entryComponents: [
		ConfirmationDialogComponent
	],
	exports: [
		ConfirmationDialogComponent
	]
})
export class DialogsModule { }

