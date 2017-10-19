import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';

import { DialogsService } from '../../util/dialogs/dialogs.service'

import { RoleService } from '../../yawl/resources/services/role.service';



@Component({
    templateUrl: 'roles-list.page.html'
})
export class RolesListPage {

	@ViewChild('searchBox')
	searchBox : ElementRef;

	public roles = [];

	public isLoading = false;

	public searchQuery = '';


	constructor(
		private router: Router,
		private notificationsService : NotificationsService,
		private dialogsService : DialogsService,
		private roleService : RoleService) {
	}

	ngOnInit() {
		this.reload();
	}

	ngAfterViewInit() {
        this.searchBox.nativeElement.focus();
    }


	reload() {
		this.isLoading = true;

		this.roleService.findAll().subscribe((loadedRoles) => {
			this.roles = loadedRoles.sort((n1,n2) => {
				if (n1.name > n2.name) {
				   return 1;
				}
				if (n1.name < n2.name) {
					return -1;
				}
				return 0;
			});
		},
		() => {
			this.notificationsService.error("Error", "Could not load roles!");
		},
		() => {
			this.isLoading = false;
		});

	}


	openFormForNew() {
		let url = '/role/new';
		this.router.navigate([url]);
	}


	gotoDetailsPage(item) {
		if(item) {
			this.router.navigate(['role', item.id]);
		}
	}

}
