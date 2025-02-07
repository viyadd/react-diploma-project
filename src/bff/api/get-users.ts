import { getUrl } from "../shared/lib";
import { DataBaseUserDataKeys } from "../shared/model";
import { transformUser } from "../transformers";

export const getUsers = () =>
	fetch(getUrl('/users'))
		.then((loadedUsers) => loadedUsers.json())
		.then((loadedUsers) => loadedUsers && loadedUsers.map(
			(loadedUser: Record<DataBaseUserDataKeys, unknown>) => transformUser(loadedUser)))
