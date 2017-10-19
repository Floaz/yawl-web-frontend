import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';

import { SpecificationService } from '../../yawl/resources/services/specification.service';
import { Specification } from '../../yawl/resources/entities/specification.entity';


@Component({
    templateUrl: 'specification-upload.page.html'
})
export class SpecificationUploadPage {

	private fileName = null;
	private specificationData = null;
	private dropZoneOver = false;

	constructor(
		private router: Router,
		private notificationsService : NotificationsService,
		private specificationService : SpecificationService) {
	}

	onDragEnter(event) {
		event.stopPropagation();
		event.preventDefault();
		this.dropZoneOver = true;
	}

	onDragLeave(event) {
		event.stopPropagation();
		event.preventDefault();
		this.dropZoneOver = false;
	}

	onDragOver(event) {
		event.stopPropagation();
		event.preventDefault();
		event.dataTransfer.dropEffect = 'copy';
	}

	onDrop(event) {
		event.stopPropagation();
		event.preventDefault();

		this.dropZoneOver = false;

		let files = event.dataTransfer.files;

		if(files.length <= 0) {
			return;
		}

		let file = files[0];
		this.readThis(file);
	}


	onFileSelected($event): void {
		let files = $event.target.files;

		if(files.length <= 0) {
			return;
		}

		let file = files[0];
		this.readThis(file);
	}


	readThis(file : File): void {
		this.fileName = file.name;

		var reader: FileReader = new FileReader();

		reader.onloadend = (e) => {
			this.specificationData = reader.result;
		}

		reader.readAsText(file);
	}


	uploadSepcification() {
		this.specificationService.save(this.specificationData).subscribe((result) => {
			this.gotoSpecificationsPage();
			this.notificationsService.success("Specification uploaded", "The new specification was successfully uploaded!");
		},
		(error) => {
			this.notificationsService.error("Could not upload specification", error);
		})
	}


	reset() {
		this.fileName = null;
		this.specificationData = null;
	}


	gotoSpecificationsPage() {
		let url = '/specifications';
		this.router.navigate([url]);
	}

}
