import { AppRole } from "../constants"

export const transformAppRoleIdToDBField = (value: AppRole) => {
	switch(value) {
		case AppRole.Admin:
			return '001'
		case AppRole.User:
			return '002'
		default:
			return '003'
	}
}
