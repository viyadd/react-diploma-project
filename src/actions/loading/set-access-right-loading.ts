import { ActionType } from "@/types";

export const setAccessRightLoading = (isLoading?: boolean) => ({
	type: ActionType.SetLoading,
	payload: { isAccessRightLoading: !!isLoading },
})
