import { getUser } from '../api';
import { sessions } from '../sessions';

export const authorize = async (authLogin: string, authPassword: string) => {
  const user = await getUser(authLogin);

  if (!user) {
    return {
      error: 'Такой пользователь не найден',
      res: null,
    };
  }
  const { id, login, password, roleId, registredAt } = user;
  if (authPassword !== password) {
    return {
      error: 'Неверный пароль',
      res: null,
    };
  }

  return {
    error: null,
    res: {
      id,
      login,
      roleId,
			registredAt,
      session: sessions.create(user),
    },
  };
};
