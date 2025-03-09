import { ActionType } from "./action-type";

export const setAppUserIdentified = (isUserIdentified?: boolean) => {
	return ({
		type: ActionType.SetAppUserIdentified,
		payload: { isUserIdentified },
	})
};
