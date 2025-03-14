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

export function isDataBaseUserDataNull(val: DataBaseUserData): val is null {
	return val === null
}

export function isDataBaseUserDataFill(val?: DataBaseUserData | null): val is DataBaseUserData {
	if (val === null || typeof val !== 'object') {
		return false
	}
	return val.id !== undefined
}
