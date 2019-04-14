import { User } from '../models/user';
import { AuthActions, AuthActionTypes } from './auth.actions';



export interface AuthState {
	isAuthenticated: boolean;
	user: User;
};

const initialState: AuthState = {
	isAuthenticated: false,
	user: null
};

export function authReducer(state = initialState, action: AuthActions):AuthState {
	switch (action.type) {
		case AuthActionTypes.SET_CURRENT_USER:
			return {
				...state, 
				isAuthenticated: true,
				user: {...action.payload}
			};

			case AuthActionTypes.UNSET_CURRENT_USER:
			return {
				...state, 
				isAuthenticated: false,
				user: null
			};
		default:
			return state;
	}
}
