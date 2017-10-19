import { Injectable } from '@angular/core';

import { Observer } from './observer';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';



@Injectable()
export class ObserverRegistry {

	observerMap = new Object();


	constructor(private observers: Observer[]) {
		for(let observer of observers) {
			this.observerMap[observer.symbolicName] = observer;
		}
	}


	getObserver(symbolicName : string) : Observer {
		return this.observerMap[symbolicName];
	}


	getAllObservers() : Observable<Observer[]> {
		return Observable.create((observer) => {
			observer.next(this.observers);
			observer.complete();
		});
	}


}
