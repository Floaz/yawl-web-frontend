
import { Specification } from './specification.entity';

export interface Task {
	id : string;
	name : string;
}

export interface WorkItem {

	id : string;
	specification : Specification;
	task : Task;
	caseId : string;
	status : string;
	resourceStatus : string;
	created : number;
	documentation : string;

}
