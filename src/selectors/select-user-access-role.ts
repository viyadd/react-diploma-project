
import { AppStoreData } from '../reducers'
export const selectUserAccessRole = ({ app }: { app: AppStoreData }) => app.userAccessRole;
