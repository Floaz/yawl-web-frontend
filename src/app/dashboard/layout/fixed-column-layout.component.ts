import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { NotificationsService } from 'angular2-notifications';

import { PopupMenuService } from '../../util/popup-menu.service';

import { DashletService } from '../dashlet.service';
import { DashboardService } from '../dashboard.service';

import { SessionService } from '../../common/session/session.service';





class LayoutSettings {

	layoutSettings : any = {};


	constructor(private dashboardService: DashboardService) {
	}


	loadLayoutSettings(dashboardId : string) : Observable<any> {
        return Observable.create((observer : Observer<any>) => {
            this.dashboardService.loadLayoutSettings(dashboardId)
                .subscribe((result) => {
                    this.layoutSettings = result;
                    observer.next(result);
                },
                (error) => observer.error(error),
                () => observer.complete());
        });
	}


	saveLayoutSettings(dashboardId : string) : Observable<any>  {
        return Observable.create((observer : Observer<any>) => {
            this.dashboardService.saveLayoutSettings(dashboardId, this.layoutSettings)
                .subscribe((result) => observer.next(result),
                (error) => observer.error(error),
                () => observer.complete());
        });
	}


	checkLayout(dashletsToCheck) : boolean {
		let availableDashlets = Object.create(dashletsToCheck);

        // Check if layout has columns.
		let layoutColumns = this.layoutSettings.columns;
		if(!layoutColumns) {
			return false;
		}

        // Check existence in layout of all dashlets.
		layoutColumns.forEach((layoutColumn) => {
			layoutColumn['dashlets'].forEach((layoutDashlet) => {
				let foundDashlet = availableDashlets.find((t) => t.id == layoutDashlet);
				if(!foundDashlet) {
					return false;
				}

				// Delete from availableDashlets for later check
				var index = availableDashlets.indexOf(foundDashlet, 0);
				availableDashlets.splice(index, 1);
			});

            // Check if column size is correct.
			if(!layoutColumn.size) {
                return false;
            }
		});

        // Check if every dashlet exists in layout.
		if(availableDashlets.length > 0) {
			return false;
		}

		return true;
	}


	arrangeDashlets(dashletsToArrange) : any[] {
		let availableDashlets = Object.create(dashletsToArrange);

		if(!this.checkLayout(dashletsToArrange)) {
			return [];
		}

        let columns = [];

		this.layoutSettings.columns.forEach((layoutColumn) => {
			let selectedDashlets = [];
			layoutColumn['dashlets'].forEach((layoutDashlet) => {
				let foundDashlet = availableDashlets.find((t) => t.id == layoutDashlet);
				if(!foundDashlet) {
					return [];
				}

				selectedDashlets.push(foundDashlet);

				// Delete from availableDashlets
				var index = availableDashlets.indexOf(foundDashlet, 0);
				availableDashlets.splice(index, 1);
			});

			let column = {
				'size': layoutColumn.size,
				'dashlets': selectedDashlets
			};
			columns.push(column);
		});

		return columns;
	}


	initDashletLayouts(dashletsToArrange) {
		let availableDashlets = Object.create(dashletsToArrange);

		this.layoutSettings.columns = [
				{size: 6, dashlets: []},
				{size: 6, dashlets: []}
		];

		var availableDashlets2 = availableDashlets.splice(0, availableDashlets.length/2);


		availableDashlets.forEach((dashlet) => {
			this.layoutSettings.columns[0]['dashlets'].push(dashlet.id);
		});

		availableDashlets2.forEach((dashlet) => {
			this.layoutSettings.columns[1]['dashlets'].push(dashlet.id);
		});
	}


	changeColumns(newColumnSizes : number[]) {
		let l1 = this.layoutSettings.columns.length;
		let l2 = newColumnSizes.length;

		for(let i=0; i < Math.min(l1, l2); ++i) {
			this.layoutSettings.columns[i].size = newColumnSizes[i];
		}

		if(l1 < l2) {
			for(let i=l1; i < l2; ++i) {
				this.layoutSettings.columns.push({
					size:  newColumnSizes[i],
					dashlets: []
				});
			}
		}
		else if(l1 > l2) {
			for(let i=l2; i < l1; ++i) {
				let newDashletList = this.layoutSettings.columns[0].dashlets.concat(this.layoutSettings.columns[i].dashlets);
				this.layoutSettings.columns[0].dashlets = newDashletList;
				this.layoutSettings.columns.splice(i, 1);
			}
		}
	}


	moveDashletToHead(itemId, column : number) {
		this.removeDashletFromSettings(itemId);
		this.layoutSettings.columns[column]['dashlets'].splice(0, 0, itemId);
	}


	moveDashletAfter(itemId, afterItemId) {
		if(itemId == afterItemId) {
			return;
		}

		this.removeDashletFromSettings(itemId);

		this.layoutSettings.columns.forEach((layoutColumn) => {
			var index = layoutColumn['dashlets'].indexOf(afterItemId, 0);
			if(index > -1) {
				layoutColumn['dashlets'].splice(index+1, 0, itemId);
			}
		});
	}


	removeDashletFromSettings(dashletId) {
		this.layoutSettings.columns.forEach((layoutColumn) => {
			var index = layoutColumn['dashlets'].indexOf(dashletId, 0);
			if(index > -1) {
				layoutColumn['dashlets'].splice(index, 1);
			}
		});
	}

}




@Component({
    selector: 'fixed-column-layout',
    templateUrl: 'fixed-column-layout.component.html'
})
export class FixedColumnLayoutComponent {

	@Input('dashboard')
	dashboardId : string;

	columns = [];

	isLoading = false;

	mode = 'show';
	dragging = false;

	newDashletLayout = {
		columnNumber: 0,
		afterDashlet: null
	};

	layoutSettings : LayoutSettings;

	dashlets : any = [];


	constructor(
		private dashboardService: DashboardService,
		private dashletService: DashletService,
		private sessionService : SessionService,
		private popupMenuService : PopupMenuService,
		private notificationsService : NotificationsService,
		private router: Router) {
	}


	ngOnChanges() {
		this.layoutSettings = new LayoutSettings(this.dashboardService);
		this.reload();
	}


	reload() {
		this.layoutSettings.loadLayoutSettings(this.dashboardId)
			.subscribe((result) => {
				this.loadDashlets();
			},
			(error) => {},
			() => {});
	}


	loadDashlets() {
		this.isLoading = true;
		this.dashletService.getDashletsOfDashboard(this.dashboardId)
			.subscribe((result) => {
				this.dashlets = result.dashlets;
                if(!this.layoutSettings.checkLayout(this.dashlets)) {
                    this.layoutSettings.initDashletLayouts(this.dashlets);
                    this.layoutSettings.saveLayoutSettings(this.dashboardId).subscribe(function() {});
                }
                this.columns = this.layoutSettings.arrangeDashlets(this.dashlets);
			},
			(error) => {},
			() => {
				this.isLoading = false;
			});
	}


	startEditMode() {
		this.mode = 'edit';
	}


	startLayoutChangeMode() {
		this.mode = 'layoutchange';
	}


	startAddMode(column : number, afterDashletId : string) {
		this.mode = 'new';
		this.newDashletLayout.columnNumber = column;
		this.newDashletLayout.afterDashlet = afterDashletId;
	}


	renameDashlet(item : any, newTitle : string) {
		item.title = newTitle;
		this.dashletService.renameDashlet(item.id, item.title ? item.title : "Dashlet").subscribe();
	}


	onLayoutChange(newColumnSizes) {
		this.layoutSettings.changeColumns(newColumnSizes);

		this.layoutSettings.saveLayoutSettings(this.dashboardId).subscribe(() => {
			this.columns = this.layoutSettings.arrangeDashlets(this.dashlets);
		});

		this.mode = 'show';
	}


	onDashletAdded(dashletId) {
		this.mode = 'edit';

		if(this.newDashletLayout.afterDashlet == null) {
			this.layoutSettings.moveDashletToHead(dashletId, this.newDashletLayout.columnNumber);
		} else {
			this.layoutSettings.moveDashletAfter(dashletId, this.newDashletLayout.afterDashlet);
		}

		this.layoutSettings.saveLayoutSettings(this.dashboardId).subscribe(() => {
			this.loadDashlets();
		});
	}


	startDashletDragging() {
		this.dragging = true;
	}


	endDashletDragging() {
		this.dragging = false;
	}


	gotoDashletSettings(item) {
		let url = '/dashlet/'+item.id+'/settings';
		this.router.navigate([url]);
	}


	moveDashletToHead(item, column : number) {
		this.dragging = false;

		console.log("Move "+item.id+" to COLUMN "+column);

		this.layoutSettings.moveDashletToHead(item.id, column);

		this.layoutSettings.saveLayoutSettings(this.dashboardId).subscribe(() => {
			this.columns = this.layoutSettings.arrangeDashlets(this.dashlets);
		});
	}


	moveDashletAfter(item, afterItem) {
		if(item.id == afterItem.id) {
			console.log("Nothing to move!");
			return;
		}

		this.dragging = false;

		console.log("Move "+item.id+" after "+afterItem.id);

		this.layoutSettings.moveDashletAfter(item.id, afterItem.id);

		this.layoutSettings.saveLayoutSettings(this.dashboardId).subscribe(() => {
			this.columns = this.layoutSettings.arrangeDashlets(this.dashlets);
		});
	}


	removeDashlet(item) {
		this.isLoading = true;
        this.layoutSettings.removeDashletFromSettings(item.id);

        this.layoutSettings.saveLayoutSettings(this.dashboardId).subscribe(() => {
            this.dashletService.removeDashlet(item.id).subscribe((result) => {
                    this.loadDashlets();
                    this.notificationsService.success("Dashlet removed", "You successfully removed a dashlet instance from the dashboard");
                },
                (error) => {
                    this.notificationsService.error("Error", error);
                },
                () => {
                    this.isLoading = false;
                });
        });
	}

}
