import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';

import { DialogsService } from '../../util/dialogs/dialogs.service'

import { SpecificationService } from '../../yawl/resources/services/specification.service';
import { CaseService }			from '../../yawl/resources/services/case.service';



@Component({
    templateUrl: 'case-list.page.html',
    styleUrls: ['case-list.page.scss']
})
export class CaseListPage {

	private cases = [];
	private filteredCases = [];

	private isLoading = false;

	private specifications;
	private selectedSpecification;


	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private notificationsService : NotificationsService,
		private dialogsService : DialogsService,
		private specificationService : SpecificationService,
		private caseService : CaseService) {
	}


    ngOnInit() {
		this.specificationService.findAll().subscribe((specifications) => {
			this.specifications = specifications.sort((n1,n2) => this.sortSpecifications(n1,n2));
			this.loadCases();

			this.route.params.subscribe(params => {
				if(params['id'] && params['version']) {
					this.selectedSpecification = this.specifications.find((element) => {
						return element.id == params['id']
								&& element.version == params['version'];
					});
				}
			});
		},
		() => {
			this.notificationsService.error("Error", "Could not load specifications!");
		},
		() => {
		});

    }


	loadCases() {
		this.isLoading = true;

		this.caseService.findAll().subscribe((cases) => {
			this.cases = cases.sort((n1,n2) => Number(n2.id) - Number(n1.id));
			this.filter();
		},
		() => {
			this.notificationsService.error("Error", "Could not load cases!");
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


	onFilterChange(item) {
		this.selectedSpecification = item;
		this.filter();
	}


	filter() {
		this.filteredCases = this.cases;
		if(this.selectedSpecification) {
			this.filteredCases = this.filteredCases.filter((element) => {
				return element.specification.id == this.selectedSpecification.id
						&& element.specification.version == this.selectedSpecification.version;
			});
		}
	}


	listCases(item) {
		let url = '/cases/'+item.id+"/"+item.version;
		this.router.navigate([url]);
	}


	intendCancel(item) {
		let title = "Cancel case";
		let message = "Are you sure you want to cancel the case with id \""+item.id+"\"?";
		this.dialogsService.openConfirmationDialog(title, message, () => {
			this.cancelCase(item);
		});
	}


	cancelCase(theCase) {
		this.caseService.cancelCase(theCase.id).subscribe(() => {
			this.notificationsService.success("Case canceled", "Case successfully canceled!");
			this.loadCases();
		},
		(error) => {
			this.notificationsService.error("Could not cancel case", error);
		},
		() => {
		});
	}

}
