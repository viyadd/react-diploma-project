import { BaseUserSessionData } from '../constants';
import { transformSession } from '../transformers';
import { getUrl } from '../utils';

export const getSession = async (hash: string): Promise<BaseUserSessionData> =>
	fetch(getUrl('/sessions', { params: { hash } })).then((loadedSession) =>
		loadedSession
			.json()
			.then(([loadedSession]) => loadedSession && transformSession(loadedSession)),
	);
