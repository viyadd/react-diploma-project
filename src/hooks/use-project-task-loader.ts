import { DataBaseTaskData, isApiDataPageDescriptor, OrderByProps } from "@/types";
import { useCallback, useEffect, useState } from "react";
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

interface ProjectTaskLoaderSortOptions {
	// limit?: number,
	sort: string | null,
	orderBy: OrderByProps | null
}

const initSortOptions: ProjectTaskLoaderSortOptions = { sort: null, orderBy: null }

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
	const [sortOptions, setSortOptions] = useState<ProjectTaskLoaderSortOptions>(initSortOptions);
	const [lastPage, setLastPage] = useState<number | null>(null);

	const isTaskListLoading = useSelector(selectIsTaskListLoading)

	const dispatch = useAppDispatch();

	const load = useCallback(() => {
		if (projectId === null) {
			setTaskList(null)
			return
		}
		dispatch(setTaskListLoading(true));
		// console.log('load')

		const urlFilter = Object.fromEntries(filterOptionsList.map(key => {
			if (key === 'page') {
				return [key, page]
			}
			if (key === 'sort') {
				return [key, sortOptions.sort]
			}
			if (key === 'orderBy') {
				return [key, sortOptions.orderBy]
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
	}, [dispatch, options, page, projectId, sortOptions.orderBy, sortOptions.sort])

	useEffect(() => {
		if (projectId === null) {
			setTaskList(null)
			return
		}
		setPage(1)
	}, [projectId])

	useEffect(() => {
		if (page === null) {
			return
		}
		load()
	}, [load, page])

	return {
		isTaskListLoading,
		taskList,
		page,
		setPage,
		projectId,
		setProjectId,
		lastPage,
		sortOptions,
		setSortOptions
	}
}
