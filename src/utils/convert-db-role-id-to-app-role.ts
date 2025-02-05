import { AppRole } from "../bff/constants"

export const convertDBRoleIdToAppRole = (value: unknown) => {
	switch(value) {
		case '001':
			return AppRole.Admin
		case '002':
			return AppRole.User
		default:
			return AppRole.Guest
	}
}
