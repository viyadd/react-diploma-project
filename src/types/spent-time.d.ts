// import { AppTaskBaseData } from "./task-data";

import { DataBaseUserData } from "./user-data"

interface DataBaseSpentTimeData {
	id: string,
	startedAt: string,
	duration: number,
	comment: string,
	executor: DataBaseUserData,
}

// export type DataBaseSpentTimeDataKeys = keyof DataBaseSpentTimeData

export interface DataBaseSpentTimeWhithPaginationData {
	lastPage: number
	content: DataBaseSpentTimeData[]
}
