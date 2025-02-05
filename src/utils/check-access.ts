import { transformDBFieldToAppRoleId } from './../bff/transformers/transform-db-field-to-app-role';
import { AppRole } from "../bff/constants";

export const checkAccess = (access: AppRole[], userRoleId: string | null) =>
	userRoleId !== null && access.includes(transformDBFieldToAppRoleId(userRoleId));
