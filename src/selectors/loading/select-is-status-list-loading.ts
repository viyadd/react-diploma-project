import { LoadingStoreData } from "@/reducers";

export const selectIsStatusListLoading =
	({ loading }: { loading: LoadingStoreData }) => loading.isStatusListLoading;
