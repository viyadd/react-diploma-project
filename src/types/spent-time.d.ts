// import { AppTaskBaseData } from "./task-data";

interface DataBaseSpentTimeData {
	id: string,
	started_at: string,
	ended_at: string,
	comment: string,
	task_id: string,
	executor_id: string,
}

// export type DataBaseSpentTimeDataKeys = keyof DataBaseSpentTimeData

export interface DataBaseSpentTimeWhithPaginationData {
	lastPage: number
	content: DataBaseSpentTimeData[]
}

// export interface AppSpentTimeListBaseData {
// 	id: string,
// 	startedAt: string,
// 	endedAt: string,
// 	coment: string,
// 	taskId: string,
// 	executorId: string,
// }

// export interface AppSpentTimeListData extends AppSpentTimeListBaseData {
// 	task?: AppTaskBaseData | null
// }
