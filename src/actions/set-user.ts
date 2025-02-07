import { AppUserData } from "../bff/shared/model";
import { ActionType } from "./action-type";

export const setUser = ({id, login, roleId, session}: AppUserData) => {
	return ({
	type: ActionType.SetUser,
	payload: {id, login, roleId, session},
})};
