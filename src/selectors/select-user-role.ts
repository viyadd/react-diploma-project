import { UserStoreData } from '../reducers'
export const selectUserRole = ({ user }: { user: UserStoreData}) => user.roleId;
