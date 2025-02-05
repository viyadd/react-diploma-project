
import { AppStateData } from '../reducers'
export const selectUserAccessRole = ({ app }: { app: AppStateData }) => app.userAccessRole;
