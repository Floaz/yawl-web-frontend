import { NgModule }			from '@angular/core';
import { CommonModule }		from '@angular/common';
import { ReactiveFormsModule }		from '@angular/forms';
import { RouterModule }		from '@angular/router';

import { LayoutModule }					from '../common/layout/layout.module';
import { UtilSharedModule }				from '../util/util-shared.module';
import { YawlResourcesSharedModule }	from '../yawl/resources/yawl-resources-shared.module';
import { YawlResourcesListsModule }		from '../yawl/resources/yawl-resources-lists.module';

import { DynFormPage }				from './dyn-form.page';
import { DynFormComponent }			from './dyn-form';
import { DynFormField }			from './dyn-form-field';

// Routes
import { dynformRoutesConfig }	from './dyn-form.routes';



@NgModule({
	declarations: [
		DynFormPage,
		DynFormComponent,
		DynFormField,
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		RouterModule.forChild(dynformRoutesConfig),
		LayoutModule,
		UtilSharedModule,
		YawlResourcesSharedModule,
		YawlResourcesListsModule
	]
})
export class DynFormModule { }

