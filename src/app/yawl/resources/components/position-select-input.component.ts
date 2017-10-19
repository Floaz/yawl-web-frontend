import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ModalService }			from '../../../util/modal/modal.service';

import { YawlResourcesDialogsModule }	from '../yawl-resources-dialogs.module';
import { PositionSelectDialogComponent }	from '../dialogs/position-select-dialog.component';

import { PositionService }			from '../services/position.service';
import { Position }					from '../entities/position.entity';


@Component({
    selector: 'position-select',
    templateUrl: 'position-select-input.component.html'
})
export class PositionSelectInputComponent {

	@Input("position")
	public position : string = null;

	@Input("ignore")
	public ignore : string[] = [];

	@Output()
	positionChanged = new EventEmitter();

	public displayedPosition : Position = null;

	public isLoading = false;



    constructor(
		private positionService : PositionService,
		private modalService: ModalService) {
    }


	ngOnInit() {

	}


	ngOnChanges() {
		this.updateDisplay();
	}


	updateDisplay() {
		if(this.position == null) {
			this.displayedPosition = null;
			return;
		}

		this.isLoading = true;
		this.positionService.findById(this.position).subscribe((position : Position) =>  {
			this.displayedPosition = position;
			this.isLoading = false;
		},
		() => {
			console.log("Could not load position!");
		});
	}


	openSelectionDialog() {
		let modal = this.modalService.create(YawlResourcesDialogsModule, PositionSelectDialogComponent, {
				'ignore': this.ignore,
				'onSelected': (position) => this.select(position),
				'showNoSelectionButton': true
			});
		modal.subscribe((ref) => {});
	}


	select(position) {
		if(position == null) {
			this.deselect();
			return;
		}
		this.positionChanged.emit(position.id);
		this.displayedPosition = position;
	}


	deselect() {
		this.displayedPosition = null;
		this.positionChanged.emit(null);
	}

}
