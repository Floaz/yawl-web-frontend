import { NgModule, APP_INITIALIZER }	from '@angular/core';
import { BrowserModule }	from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule }		from '@angular/forms';
import { RouterModule }		from '@angular/router';
import { HttpModule }		from '@angular/http';

import { ContextMenuModule } from 'ngx-contextmenu';

import { SimpleNotificationsModule }	from 'angular2-notifications';

import { PopupMenuComponent }			from './util/popup-menu.component';
import { PopupMenuService }				from './util/popup-menu.service';

import { LayoutModule }			from './common/layout/layout.module';
import { SessionModule }		from './common/session/session.module';
import { DashboardModule }		from './dashboard/dashboard.module';
import { NotificationsModule }  from './notifications/notifications.module';
import { DynFormModule }		from './dyn-form/dyn-form.module';
import { OrganisationModule }	from './organisation/organisation.module';
import { YawlResourcesModule }	from './yawl/resources/yawl-resources.module';
import { ModalModule }			from './util/modal/modal.module';
import { DialogsRootModule }	from './util/dialogs/dialogs-root.module';

// Services
import { ConfigService }		from './common/config/config.service';

// Core
import { routesConfig }		from './app.routes';
import { AppComponent }		from './app.component';


export function appInitializing(config: ConfigService) {
    return () => config.load();
}



/**
 * This is the main module.
 *
 * @author Philipp Thomas
 */
@NgModule({
	declarations: [
		AppComponent,
		PopupMenuComponent,
	],
	bootstrap: [
		AppComponent
	],
	imports: [
        BrowserModule,
        BrowserAnimationsModule,
		RouterModule.forRoot(routesConfig),
		FormsModule,
        HttpModule,
		SimpleNotificationsModule.forRoot(),
        ContextMenuModule.forRoot({
            useBootstrap4: false,
        }),
		SessionModule,
		LayoutModule,
		DashboardModule,
		NotificationsModule,
		DynFormModule,
		OrganisationModule,
		YawlResourcesModule,
		ModalModule,
		DialogsRootModule
	],
	providers: [
		ConfigService,
		PopupMenuService,
		{ provide: APP_INITIALIZER, useFactory: appInitializing, deps: [ConfigService], multi: true }
	],
})
export class AppModule { }

