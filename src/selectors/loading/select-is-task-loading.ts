import { LoadingStoreData } from "@/reducers";

export const selectIsTaskLoading =
	({ loading }: { loading: LoadingStoreData }) => loading.isTaskLoading;
