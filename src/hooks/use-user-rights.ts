import { useState } from "react";
import { AppUserData, DataBaseUserData } from "../types";
import { AppUserRole } from "../constants"
import { convertDBRoleIdToAppRole, pushServerApiSnackbarMessage, request } from "../utils";
import { useAppDispatch, useAppSelector } from "./use-app-store";
import { setAppUserIdentified, setUser, userLogout } from "../actions";
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
				pushServerApiSnackbarMessage({ error: loadedUser.error });
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
		console.log('updateAccessRight >>')

		const convertedAppUserRole = convertDBRoleIdToAppRole(user.roleId);
		const currentIsAccessDenied = !accessList.includes(convertedAppUserRole);

		setIsAccessDenied(currentIsAccessDenied);
		// TODO AppUserData ???
		dispatch(setUser(user as AppUserData));
		dispatch(setAppUserRole(convertedAppUserRole));
		console.log('updateAccessRight', { accessList, user, convertedAppUserRole, isAccessDenied: currentIsAccessDenied })

		return { isAccessDenied: currentIsAccessDenied }
	}

	const asyncUpdateAccessRight = async (accessList: AppUserRole[]) => {
		console.log('asyncUpdateAccessRight >>')
		const user = await getUser();
		if (user === undefined) {
			setIsAccessDenied(true);
			dispatch(userLogout());
			setAppUserRole();
			return { isAccessDenied: true };
		}
		return updateAccessRight(user, accessList)
	}

	const isAccessGranted = (accessList: AppUserRole[]) =>
		currentAppUserRole !== undefined && accessList.includes(currentAppUserRole)

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
