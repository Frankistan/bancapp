import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFirebaseModule } from './modules/custom-firebase.module';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// COMPONENT
import { AppComponent } from './app.component';

import { reducers } from './app.reducer';
import { environment } from 'src/environments/environment';
import { OrdenarPipe } from './ingreso-egreso/ordenar.pipe';
import { AuthModule } from './modules/auth.module';
import { SharedModule } from './modules/shared.module';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		AuthModule,
		FormsModule,
		ReactiveFormsModule,
		CustomFirebaseModule,
		StoreModule.forRoot(reducers),
		StoreDevtoolsModule.instrument({
			maxAge: 25, // Retains last 25 states
			logOnly: environment.production, // Restrict extension to log-only mode
		}),
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
