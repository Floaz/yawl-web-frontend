import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DynFormFieldBase }     from './types/dyn-form-field-base';



@Component({
    selector: 'dyn-form',
    templateUrl: 'dyn-form.html'
})
export class DynFormComponent {

	@Input("questions")
	questions: DynFormFieldBase<any>[] = [];

	@Output("saved")
	saved = new EventEmitter();

	@Output("canceled")
	canceled = new EventEmitter();

	form: FormGroup;


	constructor() {
	}


	ngOnInit() {
		this.form = this.toFormGroup(this.questions);
	}


	toFormGroup(questions: DynFormFieldBase<any>[]) {
		let group: any = {};
		questions.forEach(question => {
			group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
													: new FormControl(question.value || '');
		});
		return new FormGroup(group);
	}


	save() {
		this.saved.emit(this.questions);
	}


	cancel() {
		this.canceled.emit();
	}

}
