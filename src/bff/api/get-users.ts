import { DataBaseUserDataKeys } from "../constants";
import { BASE_URL } from "../constants/api-options";
import { transformUser } from "../transformers";

export const getUsers = () =>
	fetch(BASE_URL + '/users')
		.then((loadedUsers) => loadedUsers.json())
		.then((loadedUsers) => loadedUsers && loadedUsers.map((loadedUser: Record<DataBaseUserDataKeys, unknown>) => transformUser(loadedUser)))
