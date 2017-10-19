import { Component, ViewChild, ViewContainerRef }     from '@angular/core';

import { Modal } from '../modal/modal.decorator';



@Component({
    selector: "alert-dialog",
    template: `
		<div class="modal-background" (click)="closeModal()"></div>
		<div class="dialog-modal card z-depth-3">
			<div class="card-header gray">
				<h2>{{title}}</h2>
			</div>
			<div class="card-content">
				<p>{{message}}</p>
				<div class="btn-group">
					<button md-raised-button color="primary" (click)="onOk()">
						<span>Ok</span>
					</button>
				</div>
			</div>
		</div>
`
})
@Modal()
export class AlertDialogComponent {

    title : string;
    message : string;

	closeModal : Function;

    onOk() : void{
        this.closeModal();
    }

}


