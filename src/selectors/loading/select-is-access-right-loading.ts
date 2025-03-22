import { LoadingStoreData } from "@/reducers";

export const selectIsAccessRightLoading =
	({ loading }: { loading: LoadingStoreData }) => loading.isAccessRightLoading;
