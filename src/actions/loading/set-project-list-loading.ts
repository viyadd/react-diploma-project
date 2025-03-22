import { ActionType } from "@/types";

export const setProjectListLoading = (isLoading?: boolean) => ({
	type: ActionType.SetLoading,
	payload: { isProjectListLoading: !!isLoading },
})
