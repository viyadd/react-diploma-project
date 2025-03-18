import { ActionType } from "@/types";

export const setTaskLoading = (isTaskLoading?: boolean) => ({
	type: ActionType.SetTaskLoading,
	payload: { isTaskLoading: !!isTaskLoading },
})
