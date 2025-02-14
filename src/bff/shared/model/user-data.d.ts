
interface DataBaseUserData {
	id: string,
	login: string,
	password: string,
	registred_at: string,
	role_id: string,
}
export type DataBaseUserDataKeys = keyof DataBaseUserData

export interface AppUserData {
	id: string,
	login: string,
	password?: string,
	registredAt: string,
	roleId: string,
}
