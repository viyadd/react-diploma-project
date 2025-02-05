import { AppRole } from '../constants';
import { transformAppRoleIdToDBField, transformUser } from '../transformers';
import { generateDate, getUrl } from '../utils';

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
		}),
	})
		.then((createdUser) => createdUser.json()
			.then((createdUser) => !!createdUser && transformUser(createdUser)));
