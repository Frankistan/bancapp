import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
	authenticated: boolean = false;

	constructor(
		private router: Router,
		private auth: AuthService
	) { }
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

		return this.auth.isAuthenticated.pipe(
			map(authenticated => {

				if (!authenticated) {
					this.router.navigate(['/auth/login']);
				}
				return authenticated;
			})
		);
	}

	canLoad(): Observable<boolean> | Promise<boolean> | boolean {

			return this.auth.isAuthenticated.pipe(
				map(authenticated => {
	
					if (!authenticated) {
						this.router.navigate(['/auth/login']);
					}
					return authenticated;
				}),
				take(1)
			);
	}
}
