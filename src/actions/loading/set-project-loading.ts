import { ActionType } from "@/types";

export const setProjectLoading = (isLoading?: boolean) => ({
	type: ActionType.SetLoading,
	payload: { isProjectLoading: !!isLoading },
})
