import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';

import { DialogsService } from '../../util/dialogs/dialogs.service'

import { RoleService }	from '../../yawl/resources/services/role.service';
import { Role }			from '../../yawl/resources/entities/role.entity';



@Component({
    templateUrl: 'role-show.page.html'
})
export class RoleShowPage {

	private roleId : string;
	private role : Role = null;

	private belongsTo : Role = null;

	private isLoading = true;

	private mode = "details";


	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private notificationsService : NotificationsService,
		private dialogsService : DialogsService,
		private roleService : RoleService) {
	}


    ngOnInit() {
		this.route.params.subscribe(params => {
			if(!params['id']) {
				this.notificationsService.error("Error", "No valid id!");
				this.gotoList();
				return;
			}

			this.roleId = params['id'];
			this.loadData();
		});

		this.route.queryParams.subscribe(queryParams => {
			if(queryParams['mode']) {
				this.mode = queryParams['mode'];
			}
		});
    }


	private loadData() {
		this.isLoading = true;
		this.roleService.findById(this.roleId).subscribe((result) => {
			this.role = result;
			this.isLoading = false;
			this.loadBelongsTo()
		},
		(error) => {
			this.notificationsService.error("Could not load role", error);
			this.gotoList();
		});
	}


	private loadBelongsTo() {
		if(!this.role.belongsTo) {
			return;
		}

		this.roleService.findById(this.role.belongsTo).subscribe((result) => {
			this.belongsTo = result;
		},
		(error) => {
			this.notificationsService.error("Could not load belongs to role!", error);
		});
	}


	setMode(newMode, event) {
		this.gotoRole(this.role, newMode);
		event.preventDefault();
	}


	gotoRole(item, mode) {
		let queryParams = {
			'mode': mode
		};
		this.router.navigate(['role', item.id], {queryParams});
	}


	gotoList() {
		this.router.navigate(['roles']);
	}


	intendEdit() {
		this.router.navigate(['role', this.role.id, 'edit']);
	}


	intendRemove() {
		let title = "Delete role";
		let message = "Are you sure you want to delete the role \""+this.role.name+"\"?";
		this.dialogsService.openConfirmationDialog(title, message, () => {
			this.removeRole(this.role);
		});
	}


	removeRole(role) {
		this.roleService.remove(role.id).subscribe(() => {
			this.notificationsService.success("Role deleted", "Role successfully deleted!");
			this.gotoList();
		},
		(error) => {
			this.notificationsService.error("Could not delete role!", error);
		},
		() => {
		});
	}

}
