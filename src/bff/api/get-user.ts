import { getUrl } from '../shared/lib';
import { transformUser } from '../transformers';

export const getUser = async (loginToFind: string) =>
	fetch(getUrl('/users', { params: { login: loginToFind } })).then((loadedUser) =>
		loadedUser.json().then(([loadedUser]) => !!loadedUser && transformUser(loadedUser)),
	);
