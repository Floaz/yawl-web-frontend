import { Component } from '@angular/core';



/**
 * This is the root component.
 * The app starts with this component.
 *
 * @author Philipp Thomas
 */
@Component({
    selector: 'app-root',
    template: `<router-outlet></router-outlet>\n\
				<context-menu></context-menu>\n\
				<simple-notifications [options]="notificationOptions"></simple-notifications>\n\
				<popup-menu></popup-menu>\n\n\
				<modal-placeholder></modal-placeholder>`,
    styleUrls: ['app.component.css']
})
export class AppComponent {

    public notificationOptions = {
        timeOut: 5000,
        lastOnBottom: true,
        clickToClose: true,
        maxLength: 100,
        maxStack: 7,
        showProgressBar: true,
        pauseOnHover: true,
        preventDuplicates: false,
        preventLastDuplicates: "visible",
        rtl: false,
        animate: "rotate",
        position: ["right", "bottom"]
	};

	ngOnInit() {
		document.body.classList.remove("loading");
	}
}
