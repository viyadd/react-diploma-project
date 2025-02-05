import { AppUserData, DataBaseUserDataKeys } from "../constants";
import { unknownToString } from "../utils";

export const transformUser = (dbUser: Record<DataBaseUserDataKeys, unknown>): AppUserData => ({
	id: unknownToString(dbUser.id),
	login: unknownToString(dbUser.login),
	password: unknownToString(dbUser.password),
	registredAt: unknownToString(dbUser.registred_at),
	roleId: unknownToString(dbUser.role_id),
	// session:
});
