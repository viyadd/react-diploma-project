// import { OperationsWithAuthorization } from '../bff/shared/model';

import { ActionType } from "../types";

export interface UserStoreData {
	id: string | null
	login: string | null
	roleId: number | null
	// session: OperationsWithAuthorization | null
}

const initialUserState: UserStoreData = {
	id: null,
	login: null,
	roleId: null,
	// session: null,
};

export const userReducer = (state = initialUserState, action: { type: ActionType; payload: UserStoreData; }) => {
	switch (action.type) {
		case ActionType.ResetUser: {
			return initialUserState;
		}
		case ActionType.SetUser: {
			return {
				...state,
				...action.payload,
			};
		}
		case ActionType.Logout: {
			return initialUserState;
		}
		default:
			return state;
	}
};
