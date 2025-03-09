import { AppUserRole } from '../constants';
import { ActionType } from './action-type';

export const resetAccessRole = () => ({
	type: ActionType.SetUserRole,
	payload: { appUserRole: AppUserRole.Guest },
});
