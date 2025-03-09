export const checkAccess = (access: string[], userRoleId: string | null) =>
	userRoleId !== null && access.includes(userRoleId);
