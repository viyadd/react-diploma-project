import { AppUserRole } from "@/constants";
import { DataBaseUserData } from "@/types";
import { createContext } from "react";

export interface UserRightsManagerContextProps {
	isAccessDenied: boolean|null,
	isAccessGranted: (accessList: AppUserRole[]) => boolean
	updateAccessRight:(user: DataBaseUserData, accessList: AppUserRole[]) => { isAccessDenied: boolean },
	isUserGuest: () => boolean,
	isUserAdmin: () => boolean,
	asyncUpdateAccessRight: (accessList: AppUserRole[]) => Promise<{
    isAccessDenied: boolean;}>
	logout: ()=>void
}

export const UserRightsManagerContext = createContext<UserRightsManagerContextProps|null>(null)
