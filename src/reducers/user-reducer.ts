import { ActionType } from '../actions';

export interface UserStateData {
	id: string | null
	login: string | null
	roleId: string | null
	session: string | null
}

const initialUserState: UserStateData = {
	id: null,
	login: null,
	roleId: null,
	session: null,
};

export const userReducer = (state = initialUserState, action: { type: ActionType; payload: UserStateData; }) => {
	switch (action.type) {
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
