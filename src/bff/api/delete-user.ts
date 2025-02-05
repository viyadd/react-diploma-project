import { getUrl } from "../utils";

export const deleteUser = (userId: string) =>
	fetch(getUrl('/users', { id: userId }), {
		method: 'DELETE',
	});
