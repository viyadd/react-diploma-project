import { getUrl } from "../shared/lib";

export const deleteUser = (userId: string) =>
	fetch(getUrl('/users', { id: userId }), {
		method: 'DELETE',
	});
