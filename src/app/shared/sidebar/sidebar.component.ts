import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { filter, takeUntil } from 'rxjs/operators';
import { User } from 'src/app/models/user';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

	destroy = new Subject<any>();
	user: User;

	constructor(
		private auth: AuthService,
		private store: Store<AppState>,
	) { }

	ngOnInit() {
		this.store.select('auth')
			.pipe(
				filter(auth => auth.user != null),
				takeUntil(this.destroy))
			.subscribe(state => {
				this.user = state.user;
			});
	}

	logout() {
		this.auth.logout();
	}

	ngOnDestroy(): void {
		this.destroy.next();
	}
}
