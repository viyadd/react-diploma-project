import { ActionType } from "@/types";

export const SetProjectListLoading = (isProjectListLoading?: boolean) => ({
	type: ActionType.SetProjectListLoading,
	payload: { isProjectListLoading: !!isProjectListLoading },
})
