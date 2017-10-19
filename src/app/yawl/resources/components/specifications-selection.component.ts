import { Component, Input, Output, EventEmitter } from '@angular/core';

import { SpecificationService } from '../services/specification.service';
import { Specification } from '../entities/specification.entity';


@Component({
    selector: 'specifications-selection',
    templateUrl: 'specifications-selection.component.html'
})
export class SpecificationsSelectionComponent {

	@Input("specifications")
	public specifications : any[] = [];

	@Output()
	specificationsChanged = new EventEmitter();

	public specificationsWrapper : any;

	public selectedSpecification : Specification;

	public allSpecifications = [];



    constructor(private specificationService : SpecificationService) {
    }


	ngOnInit() {
		this.specificationService.findAll().subscribe((specifications : Specification[]) =>  {
			this.allSpecifications = specifications.sort((n1,n2) => this.sortSpecifications(n1, n2));
			this.updateList();
		});
	}


	ngOnChanges() {
		this.updateList();
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


	updateList() {
		this.specificationsWrapper = this.specifications.map(this.mapIdToSpecificationName);
	}


	mapIdToSpecificationName = (specid : any) => {
		return {id: specid, displayName: specid.uri + ' ' + specid.version};
	}


	getPossibleSpecifications() : Specification[] {
		return this.allSpecifications.filter((specification : Specification) =>  {
			return this.specifications.find((element : any) => {
				return element.id == specification.id
						&& element.uri == specification.uri
						&& element.version == specification.version;
			}) ? false : true;
		});
	}


	addSpecification() {
		this.specifications.push({
			id: this.selectedSpecification.id,
			uri: this.selectedSpecification.uri,
			version: this.selectedSpecification.version,
		});
		this.specificationsChanged.emit(this.specifications);
		this.selectedSpecification = null;

		this.updateList();
	}


	remove(itemId : string){
		var index = this.specifications.indexOf(itemId, 0);
		if (index > -1) {
		   this.specifications.splice(index, 1);
		}

		this.updateList();

		this.specificationsChanged.emit(this.specifications);
	}
}
