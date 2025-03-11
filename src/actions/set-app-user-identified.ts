import { ActionType } from "../types";

export const setAppUserIdentified = (isUserIdentified?: boolean) => {
	return ({
		type: ActionType.SetAppUserIdentified,
		payload: { isUserIdentified },
	})
};
