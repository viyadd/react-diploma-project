import { ActionType } from "../types";

export const setUser = ({id, login, roleId}: {id: string, login: string, roleId: number}) => {
	return ({
	type: ActionType.SetUser,
	payload: {id, login, roleId},
})};
