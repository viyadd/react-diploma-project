import { AppRole } from "../constants"

export const transformDBFieldToAppRoleId = (value: unknown) => {
	switch(value) {
		case '001':
			return AppRole.Admin
		case '002':
			return AppRole.User
		default:
			return AppRole.Guest
	}
}
