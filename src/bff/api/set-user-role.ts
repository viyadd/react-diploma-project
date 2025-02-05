import { AppRole } from "../constants";
import { transformAppRoleIdToDBField } from "../transformers";
import { getUrl } from "../utils";

// TODO проверить параметры роли
export const setUserRole = (userId: string, roleId: AppRole) =>
	fetch(getUrl('/users', { id: userId }), {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			role_id: transformAppRoleIdToDBField(roleId),
		}),
	});
