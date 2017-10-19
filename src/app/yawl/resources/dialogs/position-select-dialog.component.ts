import { Component, ViewChild, ElementRef }     from '@angular/core';

import { Modal } from '../../../util/modal/modal.decorator';

import { PositionService } from '../services/position.service';
import { Position } from '../entities/position.entity';



@Component({
    selector: "position-select-dialog.component",
    templateUrl: 'position-select-dialog.component.html'
})
@Modal()
export class PositionSelectDialogComponent {

	@ViewChild('searchBox')
	searchBox : ElementRef;

	ignore : string[] = [];

	onSelected : Function;

    title : string = "Select position";

	showNoSelectionButton = false;

	public searchQuery = '';
	public selectablePositions = [];

	public allPositions = [];

	closeModal : Function;


    constructor(
		private positionService : PositionService) {
    }

	ngAfterViewInit() {
        this.searchBox.nativeElement.focus();
    }


    select(position) : void{
        this.closeModal();
		this.onSelected(position);
    }


	ngOnInit() {
		this.positionService.findAll().subscribe((positions : Position[]) =>  {
			this.allPositions = positions.sort((n1,n2) => {
				if (n1.name > n2.name) {
				   return 1;
				}
				if (n1.name < n2.name) {
					return -1;
				}
				return 0;
			});
			this.filter();
		},
		() => {
			console.log("Could not load positions!");
		});
	}


	filter() {
		if(this.searchQuery !== "") {
			this.selectablePositions = this.allPositions
				.filter((el : Position) => {
					return (el.name).toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1
							|| (el.description && el.description.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1)
							|| (el.notes && el.notes.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1);
				})
				.filter((el : Position) => {
					return this.ignore.indexOf(el.id) == -1;
				});
		} else {
			this.selectablePositions = this.allPositions
				.filter((el : Position) => {
					return this.ignore.indexOf(el.id) == -1;
				});
		}
	}

}


