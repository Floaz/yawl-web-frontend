import { Component, ElementRef, Renderer } from '@angular/core';

@Component({
    selector: 'sidebar',
    template: `<ng-content></ng-content>`
})
export class SidebarComponent {

	opened : boolean = false;

	constructor(public el: ElementRef, public renderer: Renderer) {}

	toggle(isOpen: boolean = !this.opened) {
		this.opened = isOpen;
		this.renderer.setElementClass(this.el.nativeElement, 'sidebar-visible', this.opened);
	}
}
