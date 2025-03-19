import { RolesStoreData } from "@/reducers";

export const selectRoleList = ({ roles }: { roles: RolesStoreData }) => roles.roleList;
