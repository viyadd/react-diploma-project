import { ActionType } from "@/types";

export const setUserListLoading = (isLoading?: boolean) => ({
	type: ActionType.SetLoading,
	payload: { isUserListLoading: !!isLoading },
})
