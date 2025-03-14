import { AppDispatch } from '@/store';
import { request } from '../utils/request';
import { SetStatusListLoading } from './loading/set-status-loading';
import { SetApiError } from './set-api-error';
import { ActionType, DataBaseStateData } from '@/types';

export const loadStatusListAsync = () => (dispatch: AppDispatch) => {
	dispatch(SetStatusListLoading(true))
	console.log('loadStatusListAsync')

	request(`/states`,).then((loadedStatuses) => {
		if(loadedStatuses.error){
			dispatch(SetApiError(loadedStatuses.error))
			dispatch(SetStatusListLoading())

			return dispatch({
				type: ActionType.ResetStatusList,
				payload: {},
			});
		}

		dispatch(SetStatusListLoading())
    return dispatch({
			type: ActionType.SetStatusList,
			payload: {statusList: (loadedStatuses.data as DataBaseStateData[])},
		});
  });
};
