import { ROLE } from '../constants';
import { getSession, addSession, deleteSessions } from './api';
import { AppUserData } from './constants';

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
  async access(hash: string, accessRoles: ROLE[]) {
    const dbSession = await getSession(hash);

    return !!dbSession?.user && accessRoles.includes(dbSession.user.roleId);
  },
};
