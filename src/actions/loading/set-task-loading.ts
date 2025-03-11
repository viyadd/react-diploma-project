import { ActionType } from "@/types";

export const SetTaskLoading = (isTaskLoading?: boolean) => ({
	type: ActionType.SetTaskLoading,
	payload: { isTaskLoading: !!isTaskLoading },
})
