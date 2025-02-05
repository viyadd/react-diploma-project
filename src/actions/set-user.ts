import { AppUserData } from "../bff/constants";
import { ActionType } from "./action-type";

export const setUser = ({id, login, roleId, session}: AppUserData) => {
	return ({
	type: ActionType.SetUser,
	payload: {id, login, roleId, session},
})};
