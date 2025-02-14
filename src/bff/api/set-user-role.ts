import { AppRole } from "../constants";
import { getUrl } from "../shared/lib";
import { transformAppRoleIdToDBField } from "../transformers";

// TODO проверить параметры роли не меняется
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
