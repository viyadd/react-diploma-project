import { ActionType } from "@/types";

export const setRoleListLoading = (isLoading?: boolean) => ({
	type: ActionType.SetLoading,
	payload: { isRoleListLoading: !!isLoading },
})
