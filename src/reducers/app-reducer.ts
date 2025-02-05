import { ActionType } from '../actions';
import { AppRole } from '../bff/constants';

export interface AppStateData {
	wasLogout?: boolean,
	userAccessRole?: AppRole

}
const initialAppState: AppStateData = {
	wasLogout: false,
	userAccessRole: AppRole.Guest,
};

export const appReducer = (state = initialAppState, action: { type: ActionType; payload: AppStateData; }) => {
	switch (action.type) {
		case ActionType.Logout:
			return {
				...state,
				wasLogout: !state.wasLogout,
			};
		case ActionType.SetAccessRole:
			{
				const { userAccessRole } = action.payload
				const isUserAccessRoleDefined = userAccessRole !== undefined && !!AppRole[userAccessRole]
				return {
					...state,
					userAccessRole: isUserAccessRoleDefined ? userAccessRole : AppRole.Guest,
				};
			}
		default:
			return state;
	}
};
