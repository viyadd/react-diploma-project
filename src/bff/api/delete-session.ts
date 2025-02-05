import { getUrl } from "../utils";

export const deleteSessions = async (sessionId: string) => {
	fetch(getUrl('/sessions', { id: sessionId }), {
		method: 'DELETE',
	});
};
