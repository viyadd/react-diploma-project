import { UserStateData } from "../reducers";

export const selectUserLogin = ({ user }: { user: UserStateData}) => user.login;
