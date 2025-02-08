import { Dispatch, UnknownAction } from 'redux';
export type AppThunkAction = Dispatch<UnknownAction>

export enum ActionType {
	SetUser = 'SET_USER',
	Logout = 'LOGOUT',
	SetAccessRole = 'SET_ACCESS_ROLE',
	SetToolbarOptions = 'SET_TOOLBAR',
};
