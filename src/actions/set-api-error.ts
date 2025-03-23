import { ActionType, ServerResponseErrorData } from "@/types";

export const SetApiError = (apiErrorData?: ServerResponseErrorData) => {
	return ({
		type: ActionType.SetApiError,
		payload: { apiError: apiErrorData ? apiErrorData : null },
	})
};
