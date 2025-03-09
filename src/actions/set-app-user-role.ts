import { AppUserRole } from "../constants";
import { ActionType } from "./action-type";

export const setAppUserRole = (appUserRole?: AppUserRole) => {
	return ({
		type: ActionType.SetAppUserRole,
		payload: { appUserRole },
	})
};
