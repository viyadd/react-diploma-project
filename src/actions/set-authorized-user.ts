// import { ThunkDispatch } from 'redux-thunk';
import { AppUserData } from '../bff/shared/model';
import { AppStateData } from '../reducers';
import { AppDispatch } from '../store';
import { convertDBRoleIdToAppRole } from '../utils';
import { ActionType } from './action-type';

export const setAuthorizedUser = (user: AppUserData) => (dispatch: AppDispatch) => {
	dispatch({
		type: ActionType.SetUser,
		payload: user as AppStateData,
	})
	dispatch({
		type: ActionType.SetAccessRole,
		payload: { userAccessRole: convertDBRoleIdToAppRole(user.roleId)},
	})
}
