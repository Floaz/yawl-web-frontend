import {Component, HostListener, Input, Output, EventEmitter} from '@angular/core';
import {PopupMenuService, PopupMenuClickEvent} from './popup-menu.service';


export interface MenuItem {
	click : (item: any, $event?: MouseEvent) => void;
	enabled? : (item: any) => boolean;
	html : () => string;
}


@Component({
	selector: 'popup-menu',
	template:
	`
	<div *ngIf="isShown" [ngStyle]="menuCss" class="dropdown-content">
	  <ul>
		<li *ngFor="let menuItem of menuItems" [class.disabled]="isDisabled(menuItem)">
		  <a href=""
			 class="dropdown-item"
			 [class.disabled]="isDisabled(menuItem)"
			 (click)="execute(menuItem, $event); $event.preventDefault(); $event.stopPropagation();"
			 innerHTML="{{menuItem.html(item)}}"></a>
		</li>
	  </ul>
	</div>
	`,
})
export class PopupMenuComponent {

	@Output()
	public close : EventEmitter<any> = new EventEmitter<any>();

	public menuItems: MenuItem[] = [];
	private menuLocation : { left: number, top: number } = { left: 0, top: 0 };

	public isShown: boolean = false;
	public isOpening: boolean = false;

	public item: any;



	constructor(private popupMenuService: PopupMenuService) {
		popupMenuService.show.subscribe((e: PopupMenuClickEvent) => this.showMenu(e.event, e.menuItems, e.item));
	}


	public isDisabled(link: MenuItem): boolean {
		return link.enabled && !link.enabled(this.item);
	}

	public execute(link: MenuItem, $event?: MouseEvent) {
		if (this.isDisabled(link)) {
			return;
		}
		this.hideMenu();
		link.click(this.item, $event);
	}


	public showMenu(event: MouseEvent, menuItems: any[], item: any): void {
		this.isOpening = true;
		setTimeout(() => this.isOpening = false, 200);
		if(menuItems && menuItems.length > 0) {
			this.isShown = true;
		}
		this.menuItems = menuItems;
		this.item = item;
		this.menuLocation = {
			left: event.clientX,
			top: event.clientY
		};
	}


	public hideMenu(): void {
		if(this.isShown === true) {
			this.close.emit({});
		}
		this.isShown = false;
	}


	get menuCss(): any {
		let top = this.menuLocation.top;

		let options = {
			'position': 'fixed',
			'display': this.isShown ? 'block' : 'none',
			'top': top + 'px'
		};

		if(window.innerWidth/2 < this.menuLocation.left) {
			options['right'] = ''+(window.innerWidth -this.menuLocation.left) + 'px';
		} else {
			options['left'] = ''+this.menuLocation.left + 'px';
		}

		return options;
	}


	@HostListener('document:click')
	public onClickedOutside(): void {
		if(!this.isOpening) {
			this.hideMenu();
		}
	}

}