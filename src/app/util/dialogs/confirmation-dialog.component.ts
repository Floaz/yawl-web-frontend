import { Component, ViewChild, ViewContainerRef }     from '@angular/core';

import { Modal } from '../modal/modal.decorator';



@Component({
    selector: "confirmation-dialog",
    templateUrl: 'confirmation-dialog.component.html'
})
@Modal()
export class ConfirmationDialogComponent {

    title : string;
    message : string;

	onOk : Function
	closeModal : Function;

    yes() : void{
        this.closeModal();
		
		if(this.onOk) {
			this.onOk();
		}
    }

}


