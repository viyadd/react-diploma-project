// import { OperationsWithAuthorization } from '../bff/shared/model';

import { ActionType, DataBaseStateData } from "../types";

export interface StatusStorePayloadData {
	statusList?: DataBaseStateData[],
}
export interface StatusStoreData {
	statusList: DataBaseStateData[] | null,
}
const initialStatusState: StatusStoreData = {
	statusList: null,
};

export const statusReducer = (state = initialStatusState, action: { type: ActionType; payload: StatusStorePayloadData; }) => {
	switch (action.type) {

		case ActionType.ResetStatusList: {
			return initialStatusState;
		}

		case ActionType.SetStatusList: {
			return {
				...state,
				...action.payload,
			};
		}
		default:
			return state;
	}
};
