import { ActionReducerMap } from '@ngrx/store';
import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
import * as fromMovement from './ingreso-egreso/movimiento.reducer';

export interface AppState {
	ui: fromUI.State;
	auth: fromAuth.AuthState;
	movements: fromMovement.MovementState
}

export const reducers: ActionReducerMap<AppState> = {
	ui: fromUI.uiReducer,
	auth: fromAuth.authReducer,
	movements: fromMovement.movementReducer
};



