import { Dispatch, UnknownAction } from 'redux';
export type AppThunkAction = Dispatch<UnknownAction>

export enum ActionType {
	ResetUser = 'RESET_USER',
	SetUser = 'SET_USER',
	Logout = 'LOGOUT',
	SetAppUserRole = 'SET_APP_USER_ROLE',
	SetAppUserIdentified = 'SET_APP_USER_IDENTIFIED',
	SetToolbarOptions = 'SET_TOOLBAR',
	SetApiError = 'SET_API_ERROR',
	// loading
	SetProjectListLoading = 'SET_PROJECT_LIST_LOADING',
	SetProjectLoading = 'SET_PROJECT_LOADING',
	SetTaskListLoading = 'SET_TASK_LIST_LOADING',
	SetTaskLoading = 'SET_TASK_LOADING',
	SetSpentTimeListLoading = 'SET_SPENT_TIME_LIST_LOADING',
	SetSpentTimeLoading = 'SET_SPENT_TIME_LOADING',
	SetStatusListLoading = 'SET_STATUS_LIST_LOADING',
	// task
	ResetTask = 'RESET_TASK',
	SetTask = 'SET_TASK',
	// status
	ResetStatusList = 'RESET_STATUS',
	SetStatusList = 'SET_STATUS',
};
