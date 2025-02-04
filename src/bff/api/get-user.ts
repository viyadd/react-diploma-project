import { BASE_URL } from '../constants';
import { transformUser } from '../transformers';

export const getUser = async (loginToFind: string) =>
  fetch(`${BASE_URL}/users?login=${loginToFind}`).then((loadedUser) =>
    loadedUser.json().then(([loadedUser]) => !!loadedUser && transformUser(loadedUser)),
  );
