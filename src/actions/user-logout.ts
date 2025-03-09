import { ActionType } from './action-type';

export const userLogout = () => {
	return {
		type: ActionType.Logout,
		payload: {}
	};
};
