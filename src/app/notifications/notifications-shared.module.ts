import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialSharedModule }			from '../common/layout/material-shared.module';

import { UtilSharedModule }  from '../util/util-shared.module';

// Components
import { NotificationsListComponent } from './notifications-list.component';

// Pipes
import { ObserverDisplayNamePipe } from './observations/observer-display-name.pipe';



@NgModule({
	declarations: [
		NotificationsListComponent,
		ObserverDisplayNamePipe,
	],
	imports: [
		CommonModule,
        UtilSharedModule,
        MaterialSharedModule
	],
	exports: [
		NotificationsListComponent,
		ObserverDisplayNamePipe
	]
})
export class NotificationsSharedModule { }

