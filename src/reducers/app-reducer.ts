import { ActionType } from '../actions';
import { AppUserRole } from '../constants';
import { ToolbarOptions } from '../types';

export interface AppStoreData {
	wasLogout?: boolean,
	isUserIdentified?: boolean,
	appUserRole?: AppUserRole,
	toolbarOptions?: ToolbarOptions[],
}
const initialAppState: AppStoreData = {
	wasLogout: false,
	isUserIdentified: false,
	appUserRole: AppUserRole.Guest,
	toolbarOptions: []
};

export const appReducer = (state = initialAppState, action: { type: ActionType; payload: AppStoreData; }) => {
	switch (action.type) {

		case ActionType.SetAppUserIdentified:
			return {
				...state,
				isUserIdentified: action.payload.isUserIdentified,
			};
		case ActionType.Logout:
			return {
				...state,
				wasLogout: !state.wasLogout,
			};
		case ActionType.SetAppUserRole:
			{
				const { appUserRole } = action.payload
				const isUserAppRoleDefined = appUserRole !== undefined && AppUserRole[appUserRole] !== undefined
				return {
					...state,
					appUserRole: isUserAppRoleDefined ? appUserRole : AppUserRole.Guest,
				};
			}
		case ActionType.SetToolbarOptions: {
			const { toolbarOptions } = action.payload
			return {
				...state,
				toolbarOptions: toolbarOptions
			}
		}
		default:
			return state;
	}
};
