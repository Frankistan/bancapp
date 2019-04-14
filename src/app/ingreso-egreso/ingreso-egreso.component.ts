import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-ingreso-egreso',
	templateUrl: './ingreso-egreso.component.html',
	styles: []
})
export class IngresoEgresoComponent implements OnInit {

	movimientoForm:FormGroup;
	tipo:string = 'ingreso';

	constructor(
		private _fb: FormBuilder,
	) {
		this.createForm();
	 }

	ngOnInit() {
	}

	private createForm() {
		this.movimientoForm = this._fb.group({
			description: ['', [Validators.required]],
			amount: ['1', [Validators.required,Validators.min(1)]]
		});
	}

	save(){
		console.log('data: ', {...this.movimientoForm.value,tipo: this.tipo});
	}

}
