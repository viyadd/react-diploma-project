import { ActionType } from "@/types";

export const setProjectLoading = (isProjectLoading?: boolean) => ({
	type: ActionType.SetProjectLoading,
	payload: { isProjectLoading: !!isProjectLoading },
})
