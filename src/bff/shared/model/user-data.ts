export type DataBaseUserDataKeys = 'id' | 'login' | 'password' | 'registred_at' | 'role_id'

export interface AppUserData {
	id: string,
	login: string,
	password?: string,
	registredAt: string,
	roleId: string,
	session: string,
}
