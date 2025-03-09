import { AppUserRole } from "../constants";

export interface ToolbarOptions {
	key: string;
	iconId: string;
	accessRoleList: AppUserRole[];
	onClick: () => void;
}
