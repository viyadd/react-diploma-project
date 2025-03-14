import { ActionType } from "@/types";

export const SetStatusListLoading = (isStatusListLoading?: boolean) => ({
	type: ActionType.SetStatusListLoading,
	payload: { isStatusListLoading: !!isStatusListLoading },
})
