import { AppUserData } from "../types";
import { ActionType } from "./action-type";

export const setUser = ({id, login, roleId}: AppUserData) => {
	return ({
	type: ActionType.SetUser,
	payload: {id, login, roleId},
})};
