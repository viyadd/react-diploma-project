import { getUser, addUser } from '../api';
import { sessions } from '../sessions';

export const register = async (regLogin: string, regPassword: string) => {
	const existedUser = await getUser(regLogin);

	if (existedUser) {
		return {
			error: 'Такой логин уже занят',
			data: null,
		};
	}
	const user = await addUser(regLogin, regPassword);

	if (user === false) {
		return {
			error: 'Не удалось добавить пользователя',
			data: null,
		};
	}

	return {
		error: null,
		data: {
			...user,
			session: sessions.create(user),
		},
	};
};
