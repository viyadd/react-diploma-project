import { DBAnalyticsTaskData, DBStatusAlyticsData, isValueDBAnalyticsTaskData, isValueDBProjectTasksAnalyticsData, isValueServerResponseErrorData, isValueStatusAnalyticsData } from "@/types";
import { useState } from "react";
import { useAppDispatch } from "./use-app-store";
import { setStatusListLoading } from "@/actions";
import { pushSnackbarMessage, request } from "@/utils";
import { useSelector } from "react-redux";
import { selectIsStatusListLoading } from "@/selectors";

export const useAnalyticsProjectTasksLoader = () => {
	const [statusAnalyticsList, setStatusAnalyticsList] = useState<DBStatusAlyticsData[] | null>(null);
	const [taskAnalyticsList, setTaskAnalyticsList] = useState<DBAnalyticsTaskData[] | null>(null);

	const isStatusListLoading = useSelector(selectIsStatusListLoading)

	const dispatch = useAppDispatch();


	function load(projectId: string) {
		dispatch(setStatusListLoading(true));

		const url = `/analytics/project/` + projectId

		request(url).then((analyticsData) => {
			if (isValueServerResponseErrorData(analyticsData.error)) {
				pushSnackbarMessage.errorServerApi(analyticsData.error);
				setStatusAnalyticsList(null);
				setTaskAnalyticsList(null);
				dispatch(setStatusListLoading(false));
				return;
			}

			if (isValueDBProjectTasksAnalyticsData(analyticsData.data)) {
				const statuses = analyticsData.data.statusList.filter(isValueStatusAnalyticsData)
				setStatusAnalyticsList(statuses);
				const tasks = analyticsData.data.taskList.filter(isValueDBAnalyticsTaskData)
				setTaskAnalyticsList(tasks)
			}
			dispatch(setStatusListLoading(false));
		});

	}
	return {
		isStatusListLoading,
		statusAnalyticsList,
		taskAnalyticsList,
		load,
	}
}
