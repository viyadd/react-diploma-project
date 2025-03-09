import { AppStoreData } from '../reducers'
export const selectAppUserIdentified = ({ app }: { app: AppStoreData}) => app.isUserIdentified;
