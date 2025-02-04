import { AppUserData, BASE_URL } from "../constants";

export const addSession = (hash: string, user: AppUserData) =>
	fetch(BASE_URL + '/sessions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			hash,
			user,
		}),
	});
