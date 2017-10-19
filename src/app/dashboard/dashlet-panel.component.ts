import { Component, Input, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';

import { DashletTypeService } from './dashlet-type.service';

@Component({
    selector: 'dashlet-panel',
    template: '<div #child></div>'
})
export class DashletPanelComponent {

	@Input("dashlet-id")
	dashletId : String;

	@Input("dashlet-type")
	dashletType : String;

	@ViewChild('child',  {read: ViewContainerRef})
	private child : ViewContainerRef;

	private componentRef : ComponentRef<any>

    constructor(
		private dashletTypeService : DashletTypeService,
        private componentFactoryResolver: ComponentFactoryResolver) {
    }

    ngOnInit() {
		let componentType = this.dashletTypeService.getDashletComponent(this.dashletType);
        let component = this.componentFactoryResolver.resolveComponentFactory(componentType);

        this.componentRef = this.child.createComponent(component);
        this.componentRef.instance.dashletId = this.dashletId;
        if(this.componentRef.instance.onDashletCreated) {
            this.componentRef.instance.onDashletCreated();
        }
    }

    reload() {
		this.componentRef.instance.reload();
	}

    isLoading() {
		return this.componentRef.instance.isLoading;
	}
}
