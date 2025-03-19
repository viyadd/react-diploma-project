import { LoadingStoreData } from "@/reducers";

export const selectIsRoleListLoading =
	({ loading }: { loading: LoadingStoreData }) => loading.isRoleListLoading;
