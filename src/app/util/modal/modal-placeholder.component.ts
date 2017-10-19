import { Component, ViewChild, OnInit, Injector, ViewContainerRef }     from '@angular/core';

import { ModalService } from './modal.service';



@Component({
    selector: "modal-placeholder",
    template: `<div #placeholder></div>`
})
export class ModalPlaceholderComponent implements OnInit {

    @ViewChild("placeholder", {read: ViewContainerRef})
    viewContainerRef;

    constructor(
    	private injector: Injector,
    	private modalService: ModalService) {
    }


    ngOnInit(): void {
        this.modalService.registerViewContainerRef(this.viewContainerRef);
        this.modalService.registerInjector(this.injector);
    }
}


