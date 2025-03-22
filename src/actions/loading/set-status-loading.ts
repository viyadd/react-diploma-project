import { ActionType } from "@/types";

export const setStatusListLoading = (isLoading?: boolean) => ({
	type: ActionType.SetLoading,
	payload: { isStatusListLoading: !!isLoading },
})
