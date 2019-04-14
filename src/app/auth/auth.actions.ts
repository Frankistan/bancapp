import { Action } from "@ngrx/store";
import { User } from '../models/user';

export enum AuthActionTypes {
	SET_CURRENT_USER = "[Auth] Set current user",
	UNSET_CURRENT_USER = "[Auth] Unset current user",
}

export class SetCurrentUserAction implements Action {
	readonly type = AuthActionTypes.SET_CURRENT_USER;

	constructor(public payload: User){}
}

export class UnsetCurrentUserAction implements Action {
	readonly type = AuthActionTypes.UNSET_CURRENT_USER;
}

export type AuthActions = SetCurrentUserAction | UnsetCurrentUserAction;