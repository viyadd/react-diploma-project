import { DataBaseProjectData } from "@/types";
import { pushSnackbarMessage, request } from "@/utils";
import { useAppDispatch, useAppSelector } from "./use-app-store";
import { setProjectLoading } from "@/actions";
import { useState } from "react";
import { selectIsProjectLoading } from "@/selectors";

interface SaveProjectProps {
	projectId?: string
	data: {
		title?: string,
		description?: string,
		state?: string,
	}
}
export const useProjectSaver = () => {
	const [project, setProject] = useState<DataBaseProjectData | null>(null);

	const isProjectLoading = useAppSelector(selectIsProjectLoading)

	const dispatch = useAppDispatch()

	const save = async ({ projectId, data }: SaveProjectProps) => {
		pushSnackbarMessage.info('Сохранение данных')
		dispatch(setProjectLoading(true))
		const method = typeof projectId === 'string' ? 'PATCH' : 'POST';

		const urlId = typeof projectId === 'string' ? `/${projectId}` : '';

		const loadedProject = await request(`/projects${urlId}`, method, data)
		if (loadedProject.error) {
			pushSnackbarMessage.errorServerApi(loadedProject.error);
			dispatch(setProjectLoading())
			return null;
		}
		const project = loadedProject.data as DataBaseProjectData;
		setProject(project)
		dispatch(setProjectLoading())
		pushSnackbarMessage.success('Сохранение завершено')
		return project
	}
	return {
		isProjectLoading,
		project,
		save,
	}
}
