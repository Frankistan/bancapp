import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { User } from 'src/app/models/user';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {
	destroy = new Subject<any>();
	user: User;

	constructor(
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

	ngOnDestroy(): void {
		this.destroy.next();
	}
}
