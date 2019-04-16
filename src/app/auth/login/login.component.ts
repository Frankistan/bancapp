import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styles: []
})
export class LoginComponent implements OnInit,OnDestroy {

	loginForm: FormGroup;
	cargando:boolean = false;
	destroy = new Subject<any>();

	constructor(
		private store: Store<AppState>,
		private _fb: FormBuilder,
		private auth: AuthService) {
		this.createForm();
	}

	ngOnInit() {
		this.store
		.pipe(takeUntil(this.destroy))
		.subscribe( state => {
			this.cargando = state.ui.isLoading;
		});
	}

	private createForm() {
		this.loginForm = this._fb.group({
			email: ['ffontanesf@unisono.es', [Validators.required, Validators.email]],
			password: ['123456', Validators.required]
		});
	}

	save() {
		this.auth.login(this.loginForm.value);
	}

	ngOnDestroy(): void {
        this.destroy.next();
    }

}
