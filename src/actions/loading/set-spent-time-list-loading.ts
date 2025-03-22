import { ActionType } from "@/types";

export const setSpentTimeListLoading = (isLoading?: boolean) => ({
	type: ActionType.SetLoading,
	payload: { isSpentTimeListLoading: !!isLoading },
})
