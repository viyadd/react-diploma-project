import { ActionType } from '../actions';
import { AppRole } from '../bff/constants';
import { ToolbarOptions } from '../shared/interfaces';

export interface AppStoreData {
	wasLogout?: boolean,
	userAccessRole?: AppRole
	toolbarOptions?: ToolbarOptions[]
}
const initialAppState: AppStoreData = {
	wasLogout: false,
	userAccessRole: AppRole.Guest,
	toolbarOptions: []
};

export const appReducer = (state = initialAppState, action: { type: ActionType; payload: AppStoreData; }) => {
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
			case ActionType.SetToolbarOptions:{
				const { toolbarOptions } = action.payload
				return {
					...state,
					toolbarOptions: toolbarOptions
				}}
		default:
			return state;
	}
};
