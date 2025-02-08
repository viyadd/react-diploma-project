
import { AppStateData } from '../reducers'
export const selectToolbarOptions = ({ app }: { app: AppStateData }) => app.toolbarOptions;
