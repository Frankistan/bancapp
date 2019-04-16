import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Movimiento } from '../models/movimiento';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { StartLoadingAction, StopLoadingAction } from '../shared/ui.actions';
import { filter, map, tap } from 'rxjs/operators';
import { Observable, empty } from 'rxjs';
import { AuthService } from './auth.service';
import { SetItemsAction } from '../ingreso-egreso/movimiento.actions';

@Injectable({
	providedIn: 'root'
})
export class MovementsService {
	private userId: any;
	movCollection: AngularFirestoreCollection<Movimiento>;

	constructor(
		private auth: AuthService,
		private store: Store<AppState>,
		private db: AngularFirestore) {
		// this.initMovementService();
	}

	initMovementService() {
		this.store.select('auth')
			.pipe(
				filter(auth => auth.user != null)
			)
			.subscribe(state => {
				console.log('current user: ', state.user);
				this.userId = state.user.uid;

				this.movCollection = this.db.collection("movements", ref =>
					ref.where("uid", "==", this.userId));
					this.list();
			});
	}

	list() {
		this.movCollection
			.snapshotChanges()
			.pipe(
				map(changes => {
					return changes.map(a => {

						return {
							id: a.payload.doc.id,
							...a.payload.doc.data() as Movimiento
						};
					});
				}),
			)
			.subscribe(movs => {
				this.store.dispatch(new SetItemsAction(movs));
			})
	}

	async create(movement: Movimiento) {
		this.store.dispatch(new StartLoadingAction());
		// let mov = { 
		// 	...movement, 
		// 	uid: this.user.uid, 
		// 	id: this.db.createId() 
		// };

		let mov = {
			...movement,
			uid: this.userId
		};

		try {
			// await this.db.doc(`movements/${mov.id}`).set(mov);
			await this.db.collection("movements").add(mov);
			
		} catch (error) {
			console.error(error);
			Swal.fire('Error al crear movimiento bancario: ', error.message, 'error');
			this.store.dispatch(new StopLoadingAction());
		}
	}

	async delete(id:string){
		this.store.dispatch(new StartLoadingAction());
		
		try {
			await this.db.doc(`movements/${id}/`).delete();
			Swal.fire(`Movimiento borrado con éxito: `, '', 'success');
			this.store.dispatch(new StopLoadingAction());
		} catch (error) {
			Swal.fire('Error al borrar movimiento: ', error.message, 'error');
			this.store.dispatch(new StopLoadingAction());
		}
	}
}
