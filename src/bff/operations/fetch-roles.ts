import { getRoles } from '../api';
import { sessions } from '../sessions';
import { AppRole } from '../constants';

const accessRoles = [AppRole.Admin];

export const fetchRoles = async (hash: string) => {
	const {access, res} = await sessions.accessCheck(hash, accessRoles);

	if (!access) {
		return res;
	}
	const roles = await getRoles();

	return {
		error: null,
		data: roles,
	};
};
