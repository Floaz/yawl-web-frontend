import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MdMenuTrigger } from '@angular/material';

import { PopupMenuService } from '../util/popup-menu.service';

import { NotificationsService } from './notifications.service';

import { Observer } from './observations/observer';
import { ObserverRegistry } from './observations/observer-registry.service';


@Component({
    selector: 'notifications-list',
    templateUrl: 'notifications-list.component.html'
})
export class NotificationsListComponent {

	@Input("mode")
	mode : string = 'active';

	@Input("selectedItem")
    selectedItem : string = null;
    
    @ViewChild(MdMenuTrigger)
    contextMenu: MdMenuTrigger;

	notifications : any = [];
	displayedNotifications : any = [];


	constructor(private popupMenuService: PopupMenuService,
				private observerRegistry : ObserverRegistry,
				private notificationsService : NotificationsService,
				private router: Router) {}


	ngOnChanges() {
		this.filterByMode();
	}


	ngOnInit() {
		this.reload();
	}


	reload() {
		this.notificationsService.getAllNotifications().subscribe((result) => {
			this.notifications = result.notifications;
			this.addKeyDisplayNames();
			this.filterByMode();
		});
	}


	filterByMode() {
		this.displayedNotifications = [];

		for(let notification of this.notifications) {
			if(this.mode == 'muted' && notification.status == 1) {
				this.displayedNotifications.push(notification);
			}
			else if(this.mode == 'active' && notification.status == 0) {
				if((notification.delayDate == null) || (notification.delayDate < Date.now() / 1000)) {
					this.displayedNotifications.push(notification);
				}
			}
			else if(this.mode == 'delayed' && notification.status == 0) {
				if((notification.delayDate != null) && (notification.delayDate > Date.now() / 1000)) {
					this.displayedNotifications.push(notification);
				}
			}
		}
	}


	addKeyDisplayNames() {
		for(let notification of this.notifications) {
			notification.displayData = [];

			let observer = this.observerRegistry.getObserver(notification.type);
			if(observer) {
				for(let key in notification.data) {
					let found = observer.metadataKeyNames[key];
					if(found) {
						if(key == "workItemCreationDate") {
							let d = new Date(notification.data[key]*1000);
							var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
											d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
							notification.displayData.push({ 'key': found, 'value': d.toString().substring(0,21)});
						}
						else {
							notification.displayData.push({ 'key': found, 'value': notification.data[key]});
						}
					}
				}
			}
		}
	}


	public onContextMenu($event: MouseEvent): void {
		this.contextMenu.openMenu();
		$event.preventDefault();
	}


	public onClick($event: MouseEvent, item: any): void {
		let url = '/notifications/'+item.id;
		this.router.navigate([url]);
		$event.preventDefault();
	}


	addComment(item) {
	}


	delayNotification(item) {
	}


	gotoWorkItemDetails(workItemId) {
		this.router.navigate(['workitem', workItemId]);
	}


	gotoUserDetails(userId) {
		this.router.navigate(['user', userId]);
	}


	muteNotification(item) {
		this.notificationsService.changeMuteState(item.id, true);
		item.status = 1;
		this.filterByMode();
	}


	unmuteNotification(item) {
		this.notificationsService.changeMuteState(item.id, false);
		item.status = 0;
		this.filterByMode();
	}

}
