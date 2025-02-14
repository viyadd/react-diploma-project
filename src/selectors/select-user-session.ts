import { UserStoreData } from "../reducers";

export const selectUserSession = ({ user }: { user: UserStoreData}) => user.session;
