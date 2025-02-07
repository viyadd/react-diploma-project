
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

/**
 * @deprecated используется только в useServerRequest который устарел
 * */
export enum AppOperationAPI {
	register = 'register',
	authorize = 'authorize',
	fetchUsers = 'fetchUsers',
	logout = 'logout',
	updateUserRole = 'updateUserRole',
}
