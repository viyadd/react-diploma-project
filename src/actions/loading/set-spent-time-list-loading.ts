import { ActionType } from "@/types";

export const setSpentTimeListLoading = (isSpentTimeListLoading?: boolean) => ({
	type: ActionType.SetSpentTimeListLoading,
	payload: { isSpentTimeListLoading: !!isSpentTimeListLoading },
})
