import { ActionType } from "@/types";

export const setStatusListLoading = (isStatusListLoading?: boolean) => ({
	type: ActionType.SetStatusListLoading,
	payload: { isStatusListLoading: !!isStatusListLoading },
})
