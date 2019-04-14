import { Action } from "@ngrx/store";

export enum UIActionTypes {
	START_LOADING = "[UI Loading] Start loading",
	STOP_LOADING = "[UI Loading] Stop loading",
}

export class StartLoadingAction implements Action {
	readonly type = UIActionTypes.START_LOADING;
}

export class StopLoadingAction implements Action {
	readonly type = UIActionTypes.STOP_LOADING;
}

// export class ToggleAllTodoAction implements Action {
//   readonly type = UIActionTypes.TOGGLE_ALL_TODO;
//   constructor(public payload: boolean) {}
// }

// export class SaveTodoAction implements Action{
//   readonly type = UIActionTypes.SAVE_TODO;

//   constructor(public id:number, public text: string){}
// }

// export class DeleteTodoAction implements Action{
//   readonly type = UIActionTypes.DELETE_TODO;

//   constructor(public payload: number) {}
// }

// export class DeleteCompletedTodoAction implements Action{
//   readonly type = UIActionTypes.DELETE_COMPLETED_TODOS;

// }

export type UIActions = StartLoadingAction
	| StopLoadingAction;
