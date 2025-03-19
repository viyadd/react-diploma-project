import { UserStoreData } from '../reducers'
export const selectUserId = ({ user }: { user: UserStoreData}) => user.id;
