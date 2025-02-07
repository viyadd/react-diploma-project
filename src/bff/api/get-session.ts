import { BaseUserSessionData } from '../constants';
import { getUrl } from '../shared/lib';
import { transformSession } from '../transformers';

export const getSession = async (hash: string): Promise<BaseUserSessionData> =>
	fetch(getUrl('/sessions', { params: { hash } })).then((loadedSession) =>
		loadedSession
			.json()
			.then(([loadedSession]) => loadedSession && transformSession(loadedSession)),
	);
