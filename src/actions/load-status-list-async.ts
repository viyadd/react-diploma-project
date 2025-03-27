import { AppDispatch } from '@/store';
import { request } from '../utils/request';
import { setStatusListLoading } from './loading/set-status-loading';
import { ActionType, DataBaseStateData } from '@/types';
import { pushServerApiSnackbarMessage } from '@/utils';

export const loadStatusListAsync = () => (dispatch: AppDispatch) => {
	dispatch(setStatusListLoading(true))

	request(`/states`,).then((loadedStatuses) => {
		if (loadedStatuses.error) {
			pushServerApiSnackbarMessage({ error: loadedStatuses.error });
			dispatch(setStatusListLoading())

			dispatch({
				type: ActionType.ResetStatusList,
				payload: {},
			});
		}

		dispatch(setStatusListLoading())
		dispatch({
			type: ActionType.SetStatusList,
			payload: { statusList: (loadedStatuses.data as DataBaseStateData[]) },
		});
	});
};
