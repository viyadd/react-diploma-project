import { convertDBRoleIdToAppRole } from '../utils';
import { ActionType } from './action-type';

export const setAccessRole = (user: { roleId: string }) => ({
	type: ActionType.SetAccessRole,
	payload: { userAccessRole: convertDBRoleIdToAppRole(user.roleId) },
});
