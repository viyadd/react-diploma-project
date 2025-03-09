import { AppTaskBaseData } from "./task-data";

interface DataBaseSpentTimeListData {
	id: string,
	started_at: string,
	ended_at: string,
	coment: string,
	task_id: string,
	executor_id: string,
}

export type DataBaseSpentTimeListDataKeys = keyof DataBaseSpentTimeListData

export interface AppSpentTimeListBaseData {
	id: string,
	startedAt: string,
	endedAt: string,
	coment: string,
	taskId: string,
	executorId: string,
}

export interface AppSpentTimeListData extends AppSpentTimeListBaseData {
	task?: AppTaskBaseData | null
}
