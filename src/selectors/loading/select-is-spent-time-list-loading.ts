import { LoadingStoreData } from "@/reducers";

export const selectIsSpentTimeListLoading =
	({ loading }: { loading: LoadingStoreData }) => loading.isSpentTimeListLoading;
