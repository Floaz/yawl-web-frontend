import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';

import { RoleService } from '../../yawl/resources/services/role.service';
import { Role } from '../../yawl/resources/entities/role.entity';



@Component({
    templateUrl: 'role-edit.page.html'
})
export class RoleEditPage {

	private id : string;
	public role : Role;

	public isLoading = true;


	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private notificationsService : NotificationsService,
		private roleService : RoleService) {
	}


    ngOnInit() {
		this.route.params.subscribe(params => {
			if(!params['id']) {
				this.notificationsService.error("Error", "No valid id!");
				return;
			}

			this.id = params['id'];
			this.load();
		});
    }


	public load() {
		this.isLoading = true;
		this.roleService.findById(this.id).subscribe((result) => {
			this.role = result;
			this.isLoading = false;
		},
		(error) => {
			this.notificationsService.error("Error", "Could not load role: "+error);
		});
	}


	public save() {
		this.roleService.update(this.role).subscribe(() => {
			this.notificationsService.success("Role saved", "The role was edited.");
			this.gotoRolePage();
		},
		(error) => {
			this.notificationsService.error("Error", "Could not edit role: "+error);
		});
	}


	public cancel() {
		this.gotoRolePage();
	}


	private gotoRolePage() {
		let url = '/role/'+this.id;
		this.router.navigate([url]);
	}

	private gotoRolesPage() {
		let url = '/roles';
		this.router.navigate([url]);
	}

}
