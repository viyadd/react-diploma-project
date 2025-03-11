import { ActionType } from "../types";

export const userLogout = () => {
	return {
		type: ActionType.Logout,
		payload: {}
	};
};
