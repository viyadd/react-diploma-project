export interface AppUserData {
	id: string,
	login: string,
}
export interface AppUserAuthorizedData extends AppUserData {
	password: string,
}

export interface DataBaseUserData extends AppUserData {
	registredAt: string,
	roleId: number,
	name: string,
	surname: string,
	patronymic: string,
}
export type DataBaseUserDataKeys = keyof DataBaseUserData
