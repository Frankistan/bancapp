import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Movimiento } from '../models/movimiento';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { StartLoadingAction, StopLoadingAction } from '../shared/ui.actions';

@Injectable({
	providedIn: 'root'
})
export class MovementsService {
	user: any;

	constructor(
		private store: Store<AppState>,
		private db: AngularFirestore) {
		this.store.subscribe(state => {
			this.user = state.auth.user;
		});
	}

	async create(movement: Movimiento) {
		this.store.dispatch(new StartLoadingAction());
		let mov = { ...movement, uid: this.user.uid, id: this.db.createId() };

		try {
			await this.db.doc(`movements/${mov.id}`).set(mov);
		} catch (error) {
			console.error(error);
			Swal.fire('Error al crear movimiento bancario: ', error.message, 'error');
			this.store.dispatch(new StopLoadingAction());
		}
	}
}
