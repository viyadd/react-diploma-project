import { setUserRole } from '../api';
import { AppRole } from '../constants';
import { sessions } from '../sessions';

export const updateUserRole = async (hash: string, userId: string, newUserRoleId: AppRole) => {
  const accessRoles = [AppRole.Admin];

  const access = await sessions.access(hash, accessRoles);

  if (!access) {
    return {
      error: 'Доступ запрещен',
      res: null,
    };
  }
  await setUserRole(userId, newUserRoleId);

  return {
    error: null,
    res: true,
  };
};
