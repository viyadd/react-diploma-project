import { deleteUser } from '../api';
import { sessions } from '../sessions';
import { AppRole } from '../constants';

const accessRoles = [AppRole.Admin];

export const removeUser = async (hash: string, userId: string) => {
	const {access, res} = await sessions.accessCheck(hash, accessRoles);
	if (!access) {
		return res;
	}

  await deleteUser(userId);

  return {
    error: null,
    data: true,
  };
};
