import { ActionType } from "@/types";

export const setTaskListLoading = (isTaskListLoading?: boolean) => ({
	type: ActionType.SetTaskListLoading,
	payload: { isTaskListLoading: !!isTaskListLoading},
})
