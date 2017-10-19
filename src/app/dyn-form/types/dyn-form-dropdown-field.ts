import { DynFormFieldBase } from './dyn-form-field-base';



export class DynFormDropdownField extends DynFormFieldBase<string> {

	controlType = 'dropdown';
	options: {key: string, value: string}[] = [];

	constructor(options: {} = {}) {
		super(options);
    	this.options = options['options'] || [];
	}
}

