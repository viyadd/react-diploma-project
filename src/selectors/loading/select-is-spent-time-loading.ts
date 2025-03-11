import { LoadingStoreData } from "@/reducers";

export const selectIsSpentTimeLoading =
	({ loading }: { loading: LoadingStoreData }) => loading.isSpentTimeLoading;
