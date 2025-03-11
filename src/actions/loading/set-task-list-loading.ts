import { ActionType } from "@/types";

export const SetTaskListLoading = (isTaskListLoading?: boolean) => ({
	type: ActionType.SetTaskListLoading,
	payload: { isTaskListLoading: !!isTaskListLoading},
})
