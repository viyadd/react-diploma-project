import { getUrl } from "../shared/lib";

export const deleteSessions = async (sessionId: string) => {
	fetch(getUrl('/sessions', { id: sessionId }), {
		method: 'DELETE',
	});
};
