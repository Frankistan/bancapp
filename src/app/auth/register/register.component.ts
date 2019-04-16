import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styles: []
})
export class RegisterComponent implements OnInit,OnDestroy {

	registerForm: FormGroup;
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
		this.registerForm = this._fb.group({
			email: ['ffontanesf@unisono.es', [Validators.required, Validators.email]],
			password: ['123456', Validators.required],
			name: ['Fran', Validators.required]
		});
	}

	save() {
		this.auth.createUser(this.registerForm.value);
	}

	ngOnDestroy(): void {
        this.destroy.next();
    }

}
