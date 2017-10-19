import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';

import { DynFormFieldBase }     	from './types/dyn-form-field-base';
import { DynFormDropdownField }     from './types/dyn-form-dropdown-field';
import { DynFormTextboxField }     from './types/dyn-form-textbox-field';



@Component({
    templateUrl: 'dyn-form.page.html'
})
export class DynFormPage {

	questions: DynFormFieldBase<any>[] = [];



	constructor(
		private router: Router,
		private notificationsService : NotificationsService) {
	}

	ngOnInit() {
	    this.questions = [
			new DynFormDropdownField({
				key: 'brave',
				label: 'Bravery Rating',
				options: [
					{key: 'solid',  value: 'Solid'},
					{key: 'great',  value: 'Great'},
					{key: 'good',   value: 'Good'},
					{key: 'unproven', value: 'Unproven'}
				],
				order: 4
			}),
		
			new DynFormTextboxField({
				key: 'firstName',
				label: 'First name',
				value: 'Philipp',
				required: true,
				order: 1
			}),
		
			new DynFormTextboxField({
				key: 'lastName',
				label: 'Last name',
				value: 'Thomas',
				required: true,
				order: 2
			}),
		
			new DynFormTextboxField({
				key: 'emailAddress',
				label: 'Email',
				type: 'email',
				order: 3
			})
		];
	
		this.questions.sort((a, b) => a.order - b.order);
	}

}
