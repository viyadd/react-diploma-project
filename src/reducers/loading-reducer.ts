import { ActionType } from "@/types";

export interface LoadingStoreData {
	isProjectListLoading?: boolean,
	isProjectLoading?: boolean,
	isTaskListLoading?: boolean,
	isTaskLoading?: boolean,
	isSpentTimeListLoading?: boolean,
	isSpentTimeLoading?: boolean,
}
export type LoadingStoreDataKeys = keyof LoadingStoreData

const initialAppState: LoadingStoreData = {
	isProjectListLoading: true,
	isProjectLoading: true,
	isTaskListLoading: true,
	isTaskLoading: true,
	isSpentTimeListLoading: true,
	isSpentTimeLoading: true,
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
			return {
				...state,
				...action.payload
			};
		default:
			return state;
	}
};
