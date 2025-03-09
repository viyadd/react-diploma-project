import { AppStoreData } from '../reducers'
export const selectAppUserRole = ({ app }: { app: AppStoreData}) => app.appUserRole;
