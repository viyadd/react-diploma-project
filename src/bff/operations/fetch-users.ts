import { getUsers } from "../api"

export const fetchUsers = async () => {
	const data = await getUsers()
	return {
		error: null,
		data,
	}
}
