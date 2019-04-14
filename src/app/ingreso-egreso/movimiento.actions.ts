import { Action } from '@ngrx/store';
import { Movimiento } from '../models/movimiento';


export enum MovimientoActionTypes {
	SET_ITEMS = "[Mov] Set movements",
	UNSET_ITEMS = "[Mov] Unset movements",
}

export class SetItemsAction implements Action {
	readonly type = MovimientoActionTypes.SET_ITEMS;

	constructor(public payload: Movimiento[]){}
}

export class UnsetItemsAction implements Action {
	readonly type = MovimientoActionTypes.UNSET_ITEMS;
}

export type MovementActions = UnsetItemsAction | SetItemsAction;