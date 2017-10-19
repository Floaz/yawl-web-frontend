import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';

import { DialogsService } from '../../util/dialogs/dialogs.service'

import { SpecificationService } from '../../yawl/resources/services/specification.service';
import { CaseService }			from '../../yawl/resources/services/case.service';



@Component({
    templateUrl: 'specifications-list.page.html'
})
export class SpecificationsListPage {

	public specifications = [];

	public isLoading = false;


	constructor(
		private router: Router,
		private notificationsService : NotificationsService,
		private dialogsService : DialogsService,
		private specificationService : SpecificationService,
		private caseService : CaseService) {
	}

	ngOnInit() {
		this.reload();
	}


	reload() {
		this.isLoading = true;

		this.specificationService.findAll().subscribe((loadedSpecifications) => {
			this.specifications = loadedSpecifications.sort((n1,n2) => this.sortSpecifications(n1,n2));
		},
		() => {
			this.notificationsService.error("Error", "Could not load specifications!");
		},
		() => {
			this.isLoading = false;
		});

	}

	sortSpecifications(n1, n2) {
		if (n1.uri > n2.uri) {
			return 1;
		}

		if (n1.uri < n2.uri) {
			return -1;
		}

		if (n1.version > n2.version) {
			return 1;
		}

		if (n1.version < n2.version) {
			return -1;
		}

		return 0;
	}


	openFormForNew() {
		let url = '/specification/upload';
		this.router.navigate([url]);
	}


	gotoDetailsPage(item) {
		this.router.navigate(['specification', item.id, item.version]);
	}
	

	listCases(item) {
		let url = '/cases/'+item.id+"/"+item.version;
		this.router.navigate([url]);
	}


	startCase(item) {
		this.caseService.startCase(item.id, item.version).subscribe(() => {
			this.notificationsService.success("Case started", "A case of this specification successfully stated!");
		},
		(error) => {
			this.notificationsService.error("Could not start case", error);
		},
		() => {
		});
	}


	intendRemove(item) {
		let title = "Delete specification";
		let message = "Are you sure you want to delete the specification \""+item.name+"\"?";
		this.dialogsService.openConfirmationDialog(title, message, () => {
			this.removeSpecification(item);
		});
	}


	removeSpecification(specification) {
		this.specificationService.remove(specification.id, specification.version).subscribe(() => {
			this.notificationsService.success("Specification deleted", "Specification successfully deleted!");
			this.reload();
		},
		(error) => {
			this.notificationsService.error("Could not delete specification", error);
		},
		() => {
		});
	}

}
