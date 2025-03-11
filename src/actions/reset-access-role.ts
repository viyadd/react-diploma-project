import { AppUserRole } from '../constants';
import { ActionType } from '../types';

export const resetAccessRole = () => ({
	type: ActionType.SetAppUserRole,
	payload: { appUserRole: AppUserRole.Guest },
});
