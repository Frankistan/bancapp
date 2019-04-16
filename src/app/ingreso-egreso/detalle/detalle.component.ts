import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Observable } from 'rxjs';
import { MovementState } from '../movimiento.reducer';
import { map } from 'rxjs/operators';
import { Movimiento } from 'src/app/models/movimiento';
import { MovementsService } from 'src/app/services/movements.service';

@Component({
	selector: 'app-detalle',
	templateUrl: './detalle.component.html',
	styles: []
})
export class DetalleComponent implements OnInit {
	movements$: Observable<Movimiento[]>;

	constructor(
		private store: Store<AppState>,
		private movSVC: MovementsService
	) { }

	ngOnInit() {

		this.movements$ = this.store.select('movements')
			.pipe(map(state => state.movements));
	}

	delete(id: string) {
		this.movSVC.delete(id);
	}

}
