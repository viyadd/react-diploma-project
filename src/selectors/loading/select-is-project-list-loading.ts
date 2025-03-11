import { LoadingStoreData } from "@/reducers";

export const selectIsProjectListLoading =
	({ loading }: { loading: LoadingStoreData }) => loading.isProjectListLoading;
