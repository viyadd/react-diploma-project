import { UserStateData } from "../reducers";

export const selectUserSession = ({ user }: { user: UserStateData}) => user.session;
