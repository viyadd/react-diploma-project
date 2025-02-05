import { transformDBFieldToAppRoleId } from './transformers/transform-db-field-to-app-role';
import { getSession, addSession, deleteSessions } from './api';
import { AppRole, AppUserData } from './constants';

export const sessions = {
	create(user: AppUserData) {
		const hash = Math.random().toFixed(50);

		addSession(hash, user);

		return hash;
	},
	async remove(hash: string) {
		const session = await getSession(hash);

		if (!session) {
			return;
		}
		deleteSessions(session.id);

	},
	async access(hash: string, accessRoles: AppRole[]) {
		const dbSession = await getSession(hash);
		const dbSessionUserRoleId = transformDBFieldToAppRoleId(dbSession.user.roleId)

		return !!dbSession?.user && accessRoles.includes(dbSessionUserRoleId);
	},
	async accessCheck(hash: string, accessRoles: AppRole[]) {
		const access = await sessions.access(hash, accessRoles);

		if (!access) {
			return {
				access,
				res: {
					error: 'Доступ запрещен',
					data: null,
				}
			};
		}
		return {access}
	}
};
