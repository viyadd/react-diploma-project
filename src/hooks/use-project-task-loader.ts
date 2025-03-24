import { DataBaseTaskData, isApiDataPageDescriptor, OrderByProps } from "@/types";
import { useEffect, useState } from "react";
import { useAppDispatch } from "./use-app-store";
import { setTaskListLoading } from "@/actions";
import { pushSnackbarMessage, request } from "@/utils";
import { useSelector } from "react-redux";
import { selectIsTaskListLoading } from "@/selectors";

interface ProjectTaskLoaderOptionsProps {
	limit?: number,
	sort?: string,
	orderBy?: OrderByProps
}

export type ProjectTaskLoaderOptionsPropsKeys = keyof ProjectTaskLoaderOptionsProps

const filterOptionsList: (ProjectTaskLoaderOptionsPropsKeys | 'page')[] = ['page', 'limit', 'sort', 'orderBy']

const urlFilterToString = (obj: Record<string, unknown>) => {
	if (Object.keys(obj).length === 0) {
		return ''
	}
	return '?' + Object.entries(obj).map(([key, value]) => `${key}=${value}`).join('&')
}

export const useProjectTasksLoader = (options: ProjectTaskLoaderOptionsProps) => {
	const [taskList, setTaskList] = useState<DataBaseTaskData[] | null>(null);
	const [projectId, setProjectId] = useState<string | null>(null);
	const [page, setPage] = useState<number | null>(null);
	const [lastPage, setLastPage] = useState<number | null>(null);

	const isTaskListLoading = useSelector(selectIsTaskListLoading)

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (projectId === null) {
			return
		}
		setPage(1)
	}, [projectId])

	useEffect(() => {
		if (projectId === null || page === null) {
			return
		}
		load()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page])

	function load() {
		if (projectId === null || page === null) {
			return
		}
		dispatch(setTaskListLoading(true));

		const urlFilter = Object.fromEntries(filterOptionsList.map(key => {
			if (key === 'page') {
				return [key, page]
			}
			return [key, options?.[key]]
		}).filter(w => !!w[1]))
		const url = `/projects/${projectId}/tasks` + urlFilterToString(urlFilter)

		request(url).then((tasksData) => {
			if (tasksData.error) {
				pushSnackbarMessage.errorServerApi(tasksData.error);
				dispatch(setTaskListLoading(false));
				return;
			}

			if (tasksData.data !== null) {
				if (isApiDataPageDescriptor(tasksData.data)) {
					setTaskList(tasksData.data.content as DataBaseTaskData[]);
					setLastPage(tasksData.data.lastPage)
				}
			}
			dispatch(setTaskListLoading(false));
		});



	}
	return {
		isTaskListLoading,
		taskList,
		page,
		setPage,
		projectId,
		setProjectId,
		lastPage,
	}
}
