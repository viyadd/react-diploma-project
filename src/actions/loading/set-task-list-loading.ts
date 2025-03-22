import { ActionType } from "@/types";

export const setTaskListLoading = (isLoading?: boolean) => ({
	type: ActionType.SetLoading,
	payload: { isTaskListLoading: !!isLoading},
})
