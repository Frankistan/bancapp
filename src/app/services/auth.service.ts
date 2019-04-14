import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	fUser: firebase.auth.UserCredential;

	constructor(
		private db: AngularFirestore,
		private afAuth: AngularFireAuth,
		private router: Router) { }


	initAuthListener() {
		this.afAuth.authState.subscribe((fUser: firebase.User) => {
			console.log('FB User state: ', fUser);
		});
	}

	get isAuthenticated(): Observable<boolean> {
		return this.afAuth.authState.pipe(
			map(user => { return user && user != undefined; })
		);
	}

	async createUser(user) {
		try {
			const fUser = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);

			const dUser: User = {
				uid: fUser.user.uid,
				email: fUser.user.email,
				name: user.name
			};

			this.db.doc(`users/${dUser.uid}`)
				.set(dUser)
				.then(_ => this.router.navigate(['/auth/login']));
				
		} catch (error) {
			console.error(error);
			Swal.fire('Error al crear usuario: ', error.message, 'error');
		}
	}

	async login(user) {

		try {
			await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
			this.router.navigate(['/']);
		} catch (error) {
			console.error(error);
			Swal.fire('Error al iniciar sesión: ', error.message, 'error');
		}
	}

	async logout() {
		try {
			await this.afAuth.auth.signOut();
			this.router.navigate(['/auth/login']);
		} catch (error) {
			console.error(error);
			Swal.fire('Error al finalizar sesión: ', error.message, 'error');
		}

	}
}
