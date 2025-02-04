import { AppUserData, DataBaseUserDataKeys } from "../constants";
import { unknownToString } from "../utils";
import { transformDBFieldToAppRoleId } from "./transform-db-field-to-app-role";

export const transformUser = (dbUser: Record<DataBaseUserDataKeys, unknown>): AppUserData => ({
	id: unknownToString(dbUser.id),
	login: unknownToString(dbUser.login),
	password: unknownToString(dbUser.password),
	registredAt: unknownToString(dbUser.registred_at),
	roleId: transformDBFieldToAppRoleId(dbUser.role_id),
});
