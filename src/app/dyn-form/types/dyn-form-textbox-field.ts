import { DynFormFieldBase } from './dyn-form-field-base';



export class DynFormTextboxField extends DynFormFieldBase<string> {

	controlType = 'textbox';
	type: string;

	constructor(options: {} = {}) {
		super(options);
		this.type = options['type'] ? options['type'] : 'text';
	}
}

