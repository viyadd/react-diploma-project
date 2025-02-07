import { unknownToString } from "../shared/lib";
import { AppUserData, DataBaseUserDataKeys } from "../shared/model";

export const transformUser = (dbUser: Record<DataBaseUserDataKeys, unknown>): AppUserData => ({
	id: unknownToString(dbUser.id),
	login: unknownToString(dbUser.login),
	password: unknownToString(dbUser.password),
	registredAt: unknownToString(dbUser.registred_at),
	roleId: unknownToString(dbUser.role_id),
	// session:
});
