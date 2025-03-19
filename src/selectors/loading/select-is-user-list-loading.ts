import { LoadingStoreData } from "@/reducers";

export const selectIsUserListLoading =
	({ loading }: { loading: LoadingStoreData }) => loading.isUserListLoading;
