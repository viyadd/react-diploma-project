export interface BaseSession {
	id: string
	hash: string
	user: string
}

export const transformSession = (dbSession: BaseSession) => ({
  id: dbSession.id,
  hash: dbSession.hash,
  user: dbSession.user,
});
