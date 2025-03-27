import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./use-app-store";
import { selectIsStatusListLoading, selectStatusList } from "@/selectors";
import { loadStatusListAsync } from "@/actions";

export const useStatusList = () => {
	const statusList = useAppSelector(selectStatusList);
	const isStatusListLoading = useAppSelector(selectIsStatusListLoading);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (statusList === null) {
			dispatch(loadStatusListAsync());
		}
	}, [dispatch, statusList]);

	return {
		isStatusListLoading,
		statusList,
	}
}
