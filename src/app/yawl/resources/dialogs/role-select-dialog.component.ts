import { Component, ViewChild, ElementRef }     from '@angular/core';

import { Modal } from '../../../util/modal/modal.decorator';

import { RoleService } from '../services/role.service';
import { Role } from '../entities/role.entity';



@Component({
    selector: "role-select-dialog.component",
    templateUrl: 'role-select-dialog.component.html'
})
@Modal()
export class RoleSelectDialogComponent {

	@ViewChild('searchBox')
	searchBox : ElementRef;

	ignore : string[] = [];

	onSelected : Function;

    title : string = "Select role";

	showNoSelectionButton = false;

	public searchQuery = '';
	public selectableRoles = [];

	public allRoles = [];

	closeModal : Function;


    constructor(
		private roleService : RoleService) {
    }

	ngAfterViewInit() {
        this.searchBox.nativeElement.focus();
    }


    select(role) : void{
        this.closeModal();
		this.onSelected(role);
    }


	ngOnInit() {
		this.roleService.findAll().subscribe((roles : Role[]) =>  {
			this.allRoles = roles.sort((n1,n2) => {
				if (n1.name > n2.name) {
				   return 1;
				}
				if (n1.name < n2.name) {
					return -1;
				}
				return 0;
			});
			this.filter();
		},
		() => {
			console.log("Could not load roles!");
		});
	}


	filter() {
		if(this.searchQuery !== "") {
			this.selectableRoles = this.allRoles
				.filter((el : Role) => {
					return (el.name).toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1
							|| (el.description && el.description.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1)
							|| (el.notes && el.notes.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1);
				})
				.filter((el : Role) => {
					return this.ignore.indexOf(el.id) == -1;
				});
		} else {
			this.selectableRoles = this.allRoles
				.filter((el : Role) => {
					return this.ignore.indexOf(el.id) == -1;
				});
		}
	}

}


