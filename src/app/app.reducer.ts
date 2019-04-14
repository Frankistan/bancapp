import { ActionReducerMap } from '@ngrx/store';
import * as fromUI from './shared/ui.reducer';

export interface AppState {
	ui: fromUI.State;
}

export const reducers: ActionReducerMap<AppState> = {
	ui: fromUI.uiReducer
};



