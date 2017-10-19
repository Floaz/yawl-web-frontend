import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    templateUrl: 'page-not-found.page.html'
})
export class PageNotFoundPage {

	constructor(
		private router: Router) {
	}

	navigateToHome() {
		let url = '/';
		this.router.navigate([url]);
	}

}
