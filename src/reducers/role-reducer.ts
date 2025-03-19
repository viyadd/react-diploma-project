// import { OperationsWithAuthorization } from '../bff/shared/model';

import { ActionType, DataBaseRoleData } from "../types";

export interface RolesStorePayloadData {
	roleList?: DataBaseRoleData[],
}
export interface RolesStoreData {
	roleList: DataBaseRoleData[] | null,
}
const initialRolesState: RolesStoreData = {
	roleList: null,
};

export const roleReducer = (state = initialRolesState, action: { type: ActionType; payload: RolesStorePayloadData; }) => {
	switch (action.type) {

		case ActionType.ResetRolesList: {
			return initialRolesState;
		}

		case ActionType.SetRolesList: {
			return {
				...state,
				...action.payload,
			};
		}
		default:
			return state;
	}
};
