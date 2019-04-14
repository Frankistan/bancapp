import { MovementActions, MovimientoActionTypes } from './movimiento.actions';
import { Movimiento } from '../models/movimiento';



export interface MovementState {
	movements: Movimiento[];
};

const initialState: MovementState = {
	movements: []
};

export function movementReducer(state = initialState, action: MovementActions):MovementState {
	switch (action.type) {
		case MovimientoActionTypes.SET_ITEMS:
			return {
				movements: [ ...action.payload]
			};

			case MovimientoActionTypes.UNSET_ITEMS:
			return {
				movements: []
			}
		default:
			return state;
	}
}
