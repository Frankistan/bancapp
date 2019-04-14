import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styles: []
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;

	constructor(private _fb: FormBuilder,
		private auth: AuthService) {
		this.createForm();
	}

	ngOnInit() {
	}

	private createForm() {
		this.loginForm = this._fb.group({
			email: ['ffontanesf@unisono.es', [Validators.required, Validators.email]],
			password: ['123456', Validators.required]
		});
	}

	save() {
		console.log('data: ', this.loginForm.value);
		this.auth.login(this.loginForm.value);
	}

}
