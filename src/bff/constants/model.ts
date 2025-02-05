export type DataBaseUserDataKeys = 'id' | 'login' | 'password' | 'registred_at' | 'role_id'

export enum AppRole {
	Admin = 0,
	User = 1,
	Guest = 2,
};

export interface BaseUserSessionData {
	id: string,
	hash: string,
	user: {
		login: string,
		registredAt: string,
		roleId: string,
	}
}

export interface AppUserData {
	id: string,
	login: string,
	password?: string,
	registredAt: string,
	roleId: string,
	session: string,
}

export enum AppOperationAPI {
	register = 'register',
	authorize = 'authorize',
	fetchUsers = 'fetchUsers',
	logout = 'logout',
	updateUserRole = 'updateUserRole'
}
