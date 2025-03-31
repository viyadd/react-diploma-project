import { DataBaseProjectData, isApiDataPageDescriptor, OrderByProps } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "./use-app-store";
import { setProjectListLoading } from "@/actions";
import { pushSnackbarMessage, request } from "@/utils";
// import { useUserRights } from "./use-user-rights";

interface OptionsProps {
	pagination?: boolean,
	limit?: number,
	sort?: string,
	orderBy?: OrderByProps
}

export type OptionsPropsKeys = keyof OptionsProps

const filterOptionsList: (OptionsPropsKeys | 'page')[] = ['limit', 'page', 'sort', 'orderBy']

const urlFilterToString = (obj: Record<string, unknown>) => {
	if (Object.keys(obj).length === 0) {
		return ''
	}
	return '?' + Object.entries(obj).map(([key, value]) => `${key}=${value}`).join('&')
}

export const useProjectLoader = (options?: OptionsProps) => {
	const [projectList, setProjectList] = useState<DataBaseProjectData[] | null>(null);
	const [page, setPage] = useState<number | null>(null);
	const [lastPage, setLastPage] = useState<number | null>(null);

	const dispatch = useAppDispatch();
	// console.log('useProjectLoader()', options)
	const load = useCallback(() => {
		if (options?.pagination && page === null) {
			setPage(1)
			console.log('load() >> setPage(1)')
			return
		}
		dispatch(setProjectListLoading(true));

		const urlFilter = options?.pagination === true
			? Object.fromEntries(filterOptionsList.map(key => {
				if (key === 'page') {
					return [key, page]
				}
				return [key, options?.[key]]
			}).filter(w => !!w[1]))
			: {}
		const url = options?.pagination === true
			? `/projects` + urlFilterToString(urlFilter)
			: '/projects'

		request(url).then((projectsData) => {
			if (projectsData.error) {
				pushSnackbarMessage.errorServerApi(projectsData.error);
				dispatch(setProjectListLoading(false));
				return;
			}

			if (projectsData.data !== null) {
				if (isApiDataPageDescriptor(projectsData.data)) {
					setProjectList(projectsData.data.content as DataBaseProjectData[]);
					setLastPage(projectsData.data.lastPage)
				} else {
					setProjectList(projectsData.data as DataBaseProjectData[]);
				}
			}
			dispatch(setProjectListLoading(false));
		});
	}, [dispatch, options, page])

	useEffect(() => {
		if (page === null) {
			dispatch(setProjectListLoading(false));
			setProjectList(null)
			return
		}
		load()
	}, [dispatch, load, page])

	const setCurrentPage = (newPage: number | null) => {
		if (page === newPage) {
			return
		}
		setPage(newPage)
	}


	return {
		projectList,
		load,
		page,
		setCurrentPage,
		// setPage,
		lastPage,
	}
}
