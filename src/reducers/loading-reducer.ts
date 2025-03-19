import { ActionType } from "@/types";

export interface LoadingStoreData {
	isUserListLoading?: boolean,
	isUserLoading?: boolean,
	isProjectListLoading?: boolean,
	isProjectLoading?: boolean,
	isTaskListLoading?: boolean,
	isTaskLoading?: boolean,
	isSpentTimeListLoading?: boolean,
	isSpentTimeLoading?: boolean,
	isStatusListLoading?: boolean,
	isRoleListLoading?: boolean,
}
export type LoadingStoreDataKeys = keyof LoadingStoreData

const initialAppState: LoadingStoreData = {
	isUserListLoading: true,
	isUserLoading: true,
	isProjectListLoading: true,
	isProjectLoading: true,
	isTaskListLoading: true,
	isTaskLoading: true,
	isSpentTimeListLoading: true,
	isSpentTimeLoading: true,
	isStatusListLoading: true,
	isRoleListLoading: true,
};

interface ActionLoadingReducer { type: ActionType; payload: LoadingStoreData; }

export const appLoading = (state = initialAppState, action: ActionLoadingReducer) => {
	switch (action.type) {

		case ActionType.SetProjectListLoading:
		case ActionType.SetProjectLoading:
		case ActionType.SetTaskListLoading:
		case ActionType.SetTaskLoading:
		case ActionType.SetSpentTimeListLoading:
		case ActionType.SetSpentTimeLoading:
		case ActionType.SetStatusListLoading:
		case ActionType.SetLoading:
			return {
				...state,
				...action.payload
			};
		default:
			return state;
	}
};
