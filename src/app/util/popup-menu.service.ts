import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Rx';


export interface PopupMenuClickEvent {
	event: MouseEvent;
	menuItems: any[];
	item: any;
}

@Injectable()
export class PopupMenuService {

	public show: Subject<PopupMenuClickEvent> = new Subject<PopupMenuClickEvent>();

}
