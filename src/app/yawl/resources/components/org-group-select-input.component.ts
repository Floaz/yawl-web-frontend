import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ModalService }			from '../../../util/modal/modal.service';

import { YawlResourcesDialogsModule }		from '../yawl-resources-dialogs.module';
import { OrgGroupSelectDialogComponent }	from '../dialogs/org-group-select-dialog.component';

import { OrgGroupService }			from '../services/org-group.service';
import { OrgGroup }					from '../entities/org-group.entity';


@Component({
    selector: 'org-group-select',
    templateUrl: 'org-group-select-input.component.html'
})
export class OrgGroupSelectInputComponent {

	@Input("org-group")
	public orgGroup : string = null;

	@Input("ignore")
	public ignore : string[] = [];

	@Output()
	orgGroupChanged = new EventEmitter();

	public displayedOrgGroup : OrgGroup = null;

	public isLoading = false;



    constructor(
		private orgGroupService : OrgGroupService,
		private modalService: ModalService) {
    }


	ngOnInit() {

	}


	ngOnChanges() {
		this.updateDisplay();
	}


	updateDisplay() {
		if(this.orgGroup == null) {
			this.displayedOrgGroup = null;
			return;
		}

		this.isLoading = true;
		this.orgGroupService.findById(this.orgGroup).subscribe((orgGroup : OrgGroup) =>  {
			this.displayedOrgGroup = orgGroup;
			this.isLoading = false;
		},
		() => {
			console.log("Could not load group!");
		});
	}


	openSelectionDialog() {
		let modal = this.modalService.create(YawlResourcesDialogsModule, OrgGroupSelectDialogComponent, {
				'ignore': this.ignore,
				'onSelected': (orgGroup) => this.select(orgGroup),
				'showNoSelectionButton': true
			});
		modal.subscribe((ref) => {});
	}


	select(orgGroup) {
		if(orgGroup == null) {
			this.deselect();
			return;
		}
		this.orgGroupChanged.emit(orgGroup.id);
		this.displayedOrgGroup = orgGroup;
	}


	deselect() {
		this.displayedOrgGroup = null;
		this.orgGroupChanged.emit(null);
	}

}
