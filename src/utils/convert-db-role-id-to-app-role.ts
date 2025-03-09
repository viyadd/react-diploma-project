import { AppUserRole } from "../constants"

export const convertDBRoleIdToAppRole = (value: unknown): AppUserRole => {
	switch (value) {
		case 0:
			return AppUserRole.Admin
		case 1:
			return AppUserRole.User
		default:
			return AppUserRole.Guest
	}
}
