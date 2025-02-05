import { DataBaseUserDataKeys } from "../constants";
import { transformUser } from "../transformers";
import { getUrl } from "../utils";

export const getUsers = () =>
	fetch(getUrl('/users'))
		.then((loadedUsers) => loadedUsers.json())
		.then((loadedUsers) => loadedUsers && loadedUsers.map((loadedUser: Record<DataBaseUserDataKeys, unknown>) => transformUser(loadedUser)))
