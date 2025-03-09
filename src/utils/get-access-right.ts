import { DataBaseUserData } from '../types';
import { request } from './request';

export const getAccessRight = async (access: number[]) => {
	try {
		const loadedUser = await request('/users/user');

		if (!loadedUser?.data) {
			return { isAccessGranted: false }
		}

		const user = loadedUser?.data as DataBaseUserData

		return { isAccessGranted: access.includes(user.roleId), user }
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		return { isAccessGranted: false };
	}
};
