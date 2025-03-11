import { Dispatch, UnknownAction } from 'redux';
export type AppThunkAction = Dispatch<UnknownAction>

export enum ActionType {
	ResetUser = 'RESET_USER',
	SetUser = 'SET_USER',
	Logout = 'LOGOUT',
	SetAppUserRole = 'SET_APP_USER_ROLE',
	SetAppUserIdentified = 'SET_APP_USER_IDENTIFIED',
	SetToolbarOptions = 'SET_TOOLBAR',
};
