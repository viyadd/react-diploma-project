import { ActionType } from "@/types";

export const setProjectListLoading = (isProjectListLoading?: boolean) => ({
	type: ActionType.SetProjectListLoading,
	payload: { isProjectListLoading: !!isProjectListLoading },
})
