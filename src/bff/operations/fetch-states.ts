import {getStates } from '../api';
import { sessions } from '../sessions';
import { AppRole } from '../constants';

const accessRoles = [AppRole.Admin, AppRole.User];

export const fetchStates = async (hash: string) => {
	const {access, res} = await sessions.accessCheck(hash, accessRoles);

	if (!access) {
		return res;
	}
	const data = await getStates();

	return {
		error: null,
		data,
	};
};
