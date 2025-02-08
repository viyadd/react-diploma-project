import { AppRole } from "../../bff/constants";

export interface ToolbarOptions {
	key: string;
	iconId: string;
	accessRoleList: AppRole[];
	onClick: () => void;
}
