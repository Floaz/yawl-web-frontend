import { Component, Input, Output, EventEmitter } from '@angular/core';

import { SpecificationService } from '../services/specification.service';
import { Specification } from '../entities/specification.entity';


@Component({
    selector: 'tasks-selection',
    templateUrl: 'tasks-selection.component.html'
})
export class TasksSelectionComponent {

	@Input("tasks")
	public tasks = [];

	@Output()
	tasksChanged = new EventEmitter();

	public displayTasks = [];

	public task = '';
	public selectedSpecification : Specification;
	public allSpecifications = [];


    constructor(private specificationService : SpecificationService) {
    }


	ngOnInit() {
		this.specificationService.findAll().subscribe((specifications : Specification[]) =>  {
			this.allSpecifications = specifications.sort((n1,n2) => this.sortSpecifications(n1, n2));
			this.updateList();
		});
	}


	ngOnChanges() {
		this.updateList();
	}


	updateList() {
		this.displayTasks = this.tasks.map(this.mapIdToDisplayName);
	}


	sortSpecifications(n1, n2) {
		if (n1.uri > n2.uri) {
			return 1;
		}

		if (n1.uri < n2.uri) {
			return -1;
		}

		if (n1.version > n2.version) {
			return 1;
		}

		if (n1.version < n2.version) {
			return -1;
		}

		return 0;
	}


	mapIdToDisplayName = (task : any) => {
		return {
			'task': task,
			'specification': task.specification.uri + ' ' + task.specification.version,
		};
	}


	addTask(){
		let item = {
			'specification': {
				id: this.selectedSpecification.id,
				uri: this.selectedSpecification.uri,
				version: this.selectedSpecification.version,
			},
			'taskPattern': this.task
		}
		this.tasks.push(item);
		this.tasksChanged.emit(this.tasks);

		this.task = '';

		this.updateList();
	}


	removeTask(item){
		var index = this.tasks.indexOf(item.task, 0);
		if (index > -1) {
		   this.tasks.splice(index, 1);
		}

		this.tasksChanged.emit(this.tasks);

		this.updateList();
	}
}
