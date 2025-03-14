import { AppUserRole } from "../constants";

export interface ToolbarOptions {
	key: string;
	iconId: string;
	tooltip?: string
	accessRoleList: AppUserRole[];
	onClick: () => void;
}
