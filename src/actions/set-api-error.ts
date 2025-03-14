import { ActionType } from "@/types";
import { ServerResponseErrorData } from "@/utils";

export const SetApiError = (apiErrorData?: ServerResponseErrorData) => {
	return ({
		type: ActionType.SetApiError,
		payload: { apiError: apiErrorData ? apiErrorData : null },
	})
};
