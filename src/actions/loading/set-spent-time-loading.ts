import { ActionType } from "@/types";

export const SetSpentTimeLoading = (isSpentTimeLoading?: boolean) => ({
	type: ActionType.SetSpentTimeLoading,
	payload: { isSpentTimeLoading: !!isSpentTimeLoading },
})

