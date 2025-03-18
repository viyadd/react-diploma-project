import { ActionType } from "@/types";

export const setSpentTimeLoading = (isSpentTimeLoading?: boolean) => ({
	type: ActionType.SetSpentTimeLoading,
	payload: { isSpentTimeLoading: !!isSpentTimeLoading },
})

