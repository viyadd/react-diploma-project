import { getUser } from '../api';
import { sessions } from '../sessions';

export const authorize = async (authLogin: string, authPassword: string) => {
	const user = await getUser(authLogin);

	if (!user) {
		return {
			error: 'Такой пользователь не найден',
			data: null,
		};
	}
	const { id, login, password, roleId, registredAt } = user;
	if (authPassword !== password) {
		return {
			error: 'Неверный пароль',
			data: null,
		};
	}

	return {
		error: null,
		data: {
			id,
			login,
			roleId,
			registredAt,
			session: sessions.create(user),
		},
	};
};
