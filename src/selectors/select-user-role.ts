import { UserStateData } from '../reducers'
export const selectUserRole = ({ user }: { user: UserStateData}) => user.roleId;
