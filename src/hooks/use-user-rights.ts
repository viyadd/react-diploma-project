import { useState } from "react";
import { DataBaseUserData } from "../types";
import { AppUserRole } from "../constants"
import { convertDBRoleIdToAppRole, pushServerApiSnackbarMessage, pushSnackbarMessage, request } from "../utils";
import { useAppDispatch, useAppSelector } from "./use-app-store";
import { setAccessRightLoading, setAppUserIdentified, setUser, userLogout } from "../actions";
import { setAppUserRole } from "../actions/set-app-user-role";
import { selectAppUserRole } from "../selectors";

export const useUserRights = () => {
	// const [isIdentifiedUser, setIsIdentifiedUser] = useState<boolean | null>(null);
	const [isAccessDenied, setIsAccessDenied] = useState<boolean | null>(null);

	const currentAppUserRole = useAppSelector(selectAppUserRole);
	const dispatch = useAppDispatch();

	const getUser = async () => {
		try {
			const loadedUser = await request('/users/user');

			if (loadedUser.error) {
				pushSnackbarMessage.errorServerApi(loadedUser.error);
			}

			const identified = !!loadedUser?.data
			dispatch(setAppUserIdentified(identified));

			if (!identified) {
				return
			}

			const user = loadedUser?.data as DataBaseUserData

			return user
		} catch (e) {
			const message = (e as Error).message
			pushServerApiSnackbarMessage({ error: { code: 'Unknown error (01)', message } });

			dispatch(setAppUserIdentified(false));
			return;
		}
	};

	const updateAccessRight = (user: DataBaseUserData, accessList: AppUserRole[]) => {
		const convertedAppUserRole = convertDBRoleIdToAppRole(user.roleId);
		const currentIsAccessDenied = !accessList.includes(convertedAppUserRole);

		setIsAccessDenied(currentIsAccessDenied);
		dispatch(setUser(user as DataBaseUserData));
		dispatch(setAppUserRole(convertedAppUserRole));

		return { isAccessDenied: currentIsAccessDenied }
	}

	const asyncUpdateAccessRight = async (accessList: AppUserRole[]) => {
		dispatch(setAccessRightLoading(true))
		const user = await getUser();
		if (user === undefined) {
			setIsAccessDenied(true);
			dispatch(userLogout());
			setAppUserRole();
			return { isAccessDenied: true };
		}
		const currentAccess = updateAccessRight(user, accessList)
		dispatch(setAccessRightLoading())
		return currentAccess
	}

	const isAccessGranted = (accessList: AppUserRole[]) => {
		return currentAppUserRole !== undefined && accessList.includes(currentAppUserRole)
	}

	const isUserGuest = () => currentAppUserRole === AppUserRole.Guest

	const logout = () => {
		request('/logout', 'POST')
		dispatch(userLogout());
		dispatch(setAppUserRole())
		dispatch(setAppUserIdentified(false));
	}

	return {
		logout,
		isUserGuest,
		isAccessDenied,
		updateAccessRight,
		asyncUpdateAccessRight,
		isAccessGranted,
	}
}
