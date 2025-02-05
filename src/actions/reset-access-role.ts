import { AppRole } from '../bff/constants';
import { ActionType } from './action-type';

export const resetAccessRole = () => ({
	type: ActionType.SetAccessRole,
	payload: { userAccessRole: AppRole.Guest },
});
