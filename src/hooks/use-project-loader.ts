import { DataBaseProjectData, isApiDataPageDescriptor, OrderByProps } from "@/types";
import { useEffect, useState } from "react";
import { useAppDispatch } from "./use-app-store";
import { setProjectListLoading } from "@/actions";
import { pushSnackbarMessage, request } from "@/utils";

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

	useEffect(() => {
		load(page)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page])

	function load(page?: number | null) {
		dispatch(setProjectListLoading(true));

		const urlFilter = options?.pagination === true
			? Object.fromEntries(filterOptionsList.map(key => {
				if (key === 'page') {
					setPage(page || 1)
					return [key, page || 1]
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



	}
	return {
		projectList,
		load,
		page,
		setPage,
		lastPage,
	}
}
