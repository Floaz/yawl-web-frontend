import { Injectable }     from '@angular/core';

import { ModalService } from '../modal/modal.service';

import { DialogsModule } from './dialogs.module';
import { AlertDialogComponent } from './alert-dialog.component';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';


@Injectable()
export class DialogsService {

    constructor(
		private modalService: ModalService) {
    }


	openAlertDialog(title : string, message : string) : void {
		let modal = this.modalService.create(DialogsModule, AlertDialogComponent, {
				'title': title,
				'message': message
			});
		modal.subscribe((ref) => {});
	}


	openConfirmationDialog(title : string, message : string, onOk : Function) : void {
		let modal = this.modalService.create(DialogsModule, ConfirmationDialogComponent, {
				'title': title,
				'message': message,
				'onOk': onOk
			});
		modal.subscribe((ref) => {});
	}
}



