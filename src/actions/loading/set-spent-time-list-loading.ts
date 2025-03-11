import { ActionType } from "@/types";

export const SetSpentTimeListLoading = (isSpentTimeListLoading?: boolean) => ({
	type: ActionType.SetSpentTimeListLoading,
	payload: { isSpentTimeListLoading: !!isSpentTimeListLoading },
})
