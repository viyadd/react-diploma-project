import { getUrl } from "../shared/lib";
import { AppUserData } from "../shared/model";

export const addSession = (hash: string, user: AppUserData) =>
	fetch(getUrl('/sessions'), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			hash,
			user,
		}),
	});
