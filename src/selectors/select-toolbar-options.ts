
import { AppStoreData } from '../reducers'
export const selectToolbarOptions = ({ app }: { app: AppStoreData }) => app.toolbarOptions;
