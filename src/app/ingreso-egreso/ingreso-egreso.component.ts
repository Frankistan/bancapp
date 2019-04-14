import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MovementsService } from '../services/movements.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StopLoadingAction } from '../shared/ui.actions';

@Component({
	selector: 'app-ingreso-egreso',
	templateUrl: './ingreso-egreso.component.html',
	styles: []
})
export class IngresoEgresoComponent implements OnInit,OnDestroy {

	movimientoForm:FormGroup;
	tipo:string = 'ingreso';
	cargando: boolean;
	destroy = new Subject<any>();

	constructor(
		private store: Store<AppState>,
		private _fb: FormBuilder,
		private movSVC: MovementsService,
	) {
		this.createForm();
	 }

	ngOnInit() {
		this.store.select('ui')
		.pipe(takeUntil(this.destroy))
		.subscribe(state =>{
			this.cargando = state.isLoading;

		});
	}

	private createForm() {
		this.movimientoForm = this._fb.group({
			description: ['', [Validators.required]],
			amount: ['1', [Validators.required,Validators.min(1)]]
		});
	}

	save(){
		let mov ={...this.movimientoForm.value,type: this.tipo};
		this.movSVC.create(mov).then(_ =>{
			this.store.dispatch(new StopLoadingAction());
			Swal.fire(`${this.tipo.toUpperCase()} creado con éxito: `, mov.description, 'success');
			this.reset();
		});
	}

	reset(){
		this.movimientoForm.reset({amount: 1});
	}

	ngOnDestroy(): void {
        this.destroy.next();
    }

}
