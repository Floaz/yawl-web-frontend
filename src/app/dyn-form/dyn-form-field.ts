import { Component, Input } from '@angular/core';
import { FormGroup }        from '@angular/forms';

import { DynFormFieldBase }     from './types/dyn-form-field-base';


@Component({
    selector: 'dyn-form-field',
    templateUrl: 'dyn-form-field.html'
})
export class DynFormField {

	@Input("question")
	question : DynFormFieldBase<any>;

	@Input()
	form: FormGroup;


	constructor() {
	}

	get isValid() { return this.form.controls[this.question.key].valid; }
}
