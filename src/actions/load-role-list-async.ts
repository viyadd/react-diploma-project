import { AppDispatch } from '@/store';
import { request } from '../utils/request';
import { ActionType, DataBaseRoleData } from '@/types';
import { pushSnackbarMessage } from '@/utils';
import { setRoleListLoading } from './loading/set-role-list-loading';

export const loadRoleListAsync = () => (dispatch: AppDispatch) => {
	dispatch(setRoleListLoading(true))

	request(`/users/roles`,).then((loadedRoles) => {
		if (loadedRoles.error) {
			pushSnackbarMessage.errorServerApi(loadedRoles.error);
			dispatch(setRoleListLoading())

			return dispatch({
				type: ActionType.ResetRolesList,
				payload: {},
			});
		}

		dispatch(setRoleListLoading())

		return dispatch({
			type: ActionType.SetRolesList,
			payload: { roleList: (loadedRoles.data as DataBaseRoleData[]) },
		});
	});
};
