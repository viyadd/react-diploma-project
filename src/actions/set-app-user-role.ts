import { AppUserRole } from "../constants";
import { ActionType } from "../types";

export const setAppUserRole = (appUserRole?: AppUserRole) => {
	return ({
		type: ActionType.SetAppUserRole,
		payload: { appUserRole },
	})
};
