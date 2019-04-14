import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styles: []
})
export class RegisterComponent implements OnInit {

	registerForm: FormGroup;

	constructor(private _fb: FormBuilder,
		private auth: AuthService) {
		this.createForm();
	}

	ngOnInit() {

	}

	private createForm() {
		this.registerForm = this._fb.group({
			email: ['ffontanesf@unisono.es', [Validators.required, Validators.email]],
			password: ['123456', Validators.required],
			name: ['Fran', Validators.required]
		});
	}

	save() {
		console.log('data: ', this.registerForm.value);
		this.auth.createUser(this.registerForm.value);
	}

}
