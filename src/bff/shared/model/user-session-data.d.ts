import { AppUserData } from "./user-data";


export interface AppUserSessionData extends AppUserData {
	session: string,
}
export type DataBaseUserSessionDataKeys = keyof AppUserSessionData
