import { NgModule }      from '@angular/core';

import { DialogsModule } from './dialogs.module';
import { DialogsService } from './dialogs.service';



@NgModule({
	imports: [
		DialogsModule
	],
	providers: [
		DialogsService
	]
})
export class DialogsRootModule { }

