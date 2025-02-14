import { AppRole } from '../constants';
import { generateDate, getUrl } from '../shared/lib';
import { transformAppRoleIdToDBField, transformUser } from '../transformers';

export const addUser = (login: string, password: string) =>
	fetch(getUrl('/users'), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			login,
			password,
			registred_at: generateDate(),
			role_id: transformAppRoleIdToDBField(AppRole.User),
			is_active: true,
			name: null,
			surname: null,
			patronymic: null
		}),
	})
		.then((createdUser) => createdUser.json()
			.then((createdUser) => !!createdUser && transformUser(createdUser)));
