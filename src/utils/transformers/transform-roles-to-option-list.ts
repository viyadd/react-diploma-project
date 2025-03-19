import { DataBaseRoleData } from "@/types";

export const transformRolesToOptionList = (roles: DataBaseRoleData[]) => {
	return roles.map((role) => {
		const { id , text } = role;
		const value = id.toString()
		return { key: value, value, text };
	});
};
