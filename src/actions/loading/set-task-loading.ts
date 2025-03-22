import { ActionType } from "@/types";

export const setTaskLoading = (isLoading?: boolean) => ({
	type: ActionType.SetLoading,
	payload: { isTaskLoading: !!isLoading },
})
