import { getUser, addUser } from '../api';
import { sessions } from '../sessions';

export const register = async (regLogin:string, regPassword:string) => {
  const existedUser = await getUser(regLogin);

  if (existedUser) {
    return {
      error: 'Такой логин уже занят',
      res: null,
    };
  }
  const user = await addUser(regLogin, regPassword);

	if (user === false) {
		return {
      error: 'Не удалось добавить пользователя',
      res: null,
    };
	}

  return {
    error: null,
    res: {
      ...user,
      session: sessions.create(user),
    },
  };
};
