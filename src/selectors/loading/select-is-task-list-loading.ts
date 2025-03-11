import { LoadingStoreData } from "@/reducers";

export const selectIsTaskListLoading =
	({ loading }: { loading: LoadingStoreData }) => loading.isTaskListLoading;
