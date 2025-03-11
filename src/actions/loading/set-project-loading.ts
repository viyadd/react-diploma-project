import { ActionType } from "@/types";

export const SetProjectLoading = (isProjectLoading?: boolean) => ({
	type: ActionType.SetProjectLoading,
	payload: { isProjectLoading: !!isProjectLoading },
})
