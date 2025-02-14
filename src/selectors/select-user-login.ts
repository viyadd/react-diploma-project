import { UserStoreData } from "../reducers";

export const selectUserLogin = ({ user }: { user: UserStoreData}) => user.login;
