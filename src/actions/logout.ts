import { server } from '../bff';
import { ActionType } from './action-type';

export const logout = (session: string | null) => {
	server.logout(session);
	return {
		type: ActionType.Logout,
	};
};
