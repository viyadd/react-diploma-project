import { ActionType } from "@/types";

export const setSpentTimeLoading = (isLoading?: boolean) => ({
	type: ActionType.SetLoading,
	payload: { isSpentTimeLoading: !!isLoading },
})

