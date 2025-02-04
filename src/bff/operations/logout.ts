import { sessions } from '../sessions';

export const logout = async (userSession: string | null) => {
	if (userSession) {
		sessions.remove(userSession);
	}
};
