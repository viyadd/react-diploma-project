import { LoadingStoreData } from "@/reducers";

export const selectIsProjectLoading =
	({ loading }: { loading: LoadingStoreData }) => loading.isProjectLoading;
