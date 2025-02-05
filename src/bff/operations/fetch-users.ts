import { getUsers } from "../api"
import { AppRole } from "../constants";
import { sessions } from "../sessions";

const accessRoles = [AppRole.Admin];

export const fetchUsers = async (hash: string) => {
	const {access, res} = await sessions.accessCheck(hash, accessRoles);

	if (!access) {
		return res;
	}
	const data = await getUsers()
	return {
		error: null,
		data,
	}
}
