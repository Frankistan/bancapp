import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { AngularFirestore } from '@angular/fire/firestore';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AppState } from '../app.reducer';
import { StartLoadingAction, StopLoadingAction } from '../shared/ui.actions';
import { SetCurrentUserAction, UnsetCurrentUserAction } from '../auth/auth.actions';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { UnsetItemsAction } from '../ingreso-egreso/movimiento.actions';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	fUser: firebase.auth.UserCredential;
	user: User;

	constructor(
		private store: Store<AppState>,
		private db: AngularFirestore,
		private afAuth: AngularFireAuth,
		private router: Router) { }


	initAuthListener() {
		this.afAuth.authState.subscribe((fUser: firebase.User) => {
			if (fUser) {
				this.db.doc(`users/${fUser.uid}`)
					.valueChanges()
					.subscribe((fUser: User) => {
						this.user = fUser;
						this.store.dispatch(new SetCurrentUserAction(fUser));
					});
			} else {
				this.store.dispatch(new UnsetCurrentUserAction());
			}
		});
	}

	get isAuthenticated(): Observable<boolean> {
		return this.afAuth.authState.pipe(
			map(user => { return user && user != undefined; })
		);
	}

	async createUser(user) {
		this.store.dispatch(new StartLoadingAction());
		try {
			const fUser = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);

			const dUser: User = {
				uid: fUser.user.uid,
				email: fUser.user.email,
				name: user.name
			};

			this.db.doc(`users/${dUser.uid}`)
				.set(dUser)
				.then(_ => {
					this.store.dispatch(new StopLoadingAction());
					this.router.navigate(['/auth/login'])
				});



		} catch (error) {
			console.error(error);
			Swal.fire('Error al crear usuario: ', error.message, 'error');
			this.store.dispatch(new StopLoadingAction());
		}
	}

	async login(user) {
		this.store.dispatch(new StartLoadingAction());
		try {
			await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
			this.store.dispatch(new StopLoadingAction());
			this.router.navigate(['/']);
		} catch (error) {
			console.error(error);
			this.store.dispatch(new StopLoadingAction());
			Swal.fire('Error al iniciar sesión: ', error.message, 'error');
		}
	}

	async logout() {
		try {
			await this.afAuth.auth.signOut();
			this.store.dispatch( new UnsetCurrentUserAction());
			this.store.dispatch (new UnsetItemsAction());
			this.router.navigate(['/auth/login']);
		} catch (error) {
			console.error(error);
			Swal.fire('Error al finalizar sesión: ', error.message, 'error');
		}

	}
}
