import { StatusStoreData } from "@/reducers";

export const selectStatusList = ({ statuses }: { statuses: StatusStoreData }) => statuses.statusList;
