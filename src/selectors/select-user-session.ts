import { UserStateData } from "../reducers";

export const SelectUserSession = ({ user }: { user: UserStateData}) => user.session;
