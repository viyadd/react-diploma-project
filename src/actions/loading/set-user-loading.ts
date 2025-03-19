import { ActionType } from "@/types";

export const setUserLoading = (isLoading?: boolean) => ({
	type: ActionType.SetLoading,
	payload: { isUserLoading: !!isLoading },
})
