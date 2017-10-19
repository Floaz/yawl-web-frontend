import { Component, ContentChildren, QueryList } from '@angular/core';

import { SidebarComponent } from './sidebar.component';

@Component({
    selector: 'sidebar-layout',
    template: `
		<div class="sidebar-backdrop"
			 (click)="toggleSidebar()"
			 [class.sidebar-backdrop-shown]="isSidebarOpen()">
		</div>
		<ng-content></ng-content>`
})
export class SidebarLayoutComponent {

	@ContentChildren(SidebarComponent)
	sidebar: QueryList<SidebarComponent>;

	toggleSidebar() {
		return this.sidebar.first.toggle();
	}

	isSidebarOpen() {
		return this.sidebar.first.opened;
	}

}
