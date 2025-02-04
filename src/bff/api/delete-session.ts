import { BASE_URL } from "../constants";

export const deleteSessions = async (sessionId: string) => {
  fetch(`${BASE_URL}/sessions/${sessionId}`, {
    method: 'DELETE',
  });
};
