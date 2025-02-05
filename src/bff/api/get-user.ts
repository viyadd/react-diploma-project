import { transformUser } from '../transformers';
import { getUrl } from '../utils';

export const getUser = async (loginToFind: string) =>
	fetch(getUrl('/users', { params: { login: loginToFind } })).then((loadedUser) =>
		loadedUser.json().then(([loadedUser]) => !!loadedUser && transformUser(loadedUser)),
	);
