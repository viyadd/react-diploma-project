import { DataBaseTaskData } from "@/types";
import { pushSnackbarMessage, request } from "@/utils";
import { useAppDispatch, useAppSelector } from "./use-app-store";
import { setProjectLoading as setTaskLoading } from "@/actions";
import { useState } from "react";
import { selectIsProjectLoading } from "@/selectors";

interface SaveTaskProps {
	projectId?: string
	taskId?: string
	data: {
		title?: string;
    description?: string;
    state?: string;
    codeName?: string;
    expectedSpentTime?: number;
	}
}
export const useTaskSaver = () => {
	const [task, setTask] = useState<DataBaseTaskData | null>(null);

	const isTaskLoading = useAppSelector(selectIsProjectLoading)

	const dispatch = useAppDispatch()

	const save = async ({ projectId, taskId, data }: SaveTaskProps) => {
		pushSnackbarMessage.info('Сохранение данных')
		dispatch(setTaskLoading(true))
		const method = typeof taskId === 'string' ? 'PATCH' : 'POST';

		const url = typeof taskId === 'string' ? `/tasks/${taskId}` : `/projects/${projectId}/tasks`;

		const loadedTask = await request(url, method, data)
		if (loadedTask.error) {
			pushSnackbarMessage.errorServerApi(loadedTask.error);
			dispatch(setTaskLoading())
			return null;
		}
		const newTask = loadedTask.data as DataBaseTaskData;
		setTask(newTask)
		dispatch(setTaskLoading())
		pushSnackbarMessage.success('Сохранение завершено')
		return newTask
	}
	return {
		isTaskLoading,
		task,
		save,
	}
}
