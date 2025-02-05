import { BaseUserSessionData } from "../constants";
import { unknownToString } from "../utils";

export const transformSession = (dbSession: Record<string, unknown>): BaseUserSessionData => {
	const { id, hash, user } = dbSession
	const { login, registredAt, roleId } = user ?? {}
	return {
		id: unknownToString(id),
		hash: unknownToString(hash),
		user: {
			login: unknownToString(login),
			registredAt: unknownToString(registredAt),
			roleId: unknownToString(roleId),
		}
	}
};
