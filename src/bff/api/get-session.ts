import { BASE_URL } from '../constants';
import { transformSession } from '../transformers';

export const getSession = async (hash: string) =>
  fetch(`${BASE_URL}/sessions?hash=${hash}`).then((loadedSession) =>
    loadedSession
      .json()
      .then(([loadedSession]) => loadedSession && transformSession(loadedSession)),
  );
