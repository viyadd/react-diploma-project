export type DataBaseUserDataKeys = 'id' | 'login' | 'password' | 'registred_at' | 'role_id'

export enum AppRole {
	Admin = 0,
	User = 1,
  Guest = 2,
};

export interface AppUserData {
	id: string,
	login: string,
	password?: string,
	registredAt: string,
	roleId: AppRole,
}
