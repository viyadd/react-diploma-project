import { LoadingStoreData } from "@/reducers";

export const selectIsUserLoading =
	({ loading }: { loading: LoadingStoreData }) => loading.isUserLoading;
