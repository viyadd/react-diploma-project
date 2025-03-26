import { DataBaseSpentTimeData } from "./spent-time"
import { DataBaseStateData } from "./state-data"
import { DataBaseUserData } from "./user-data"

export interface DataBaseTaskShortData {
	id: string,
	codeName: string,
	description: string,
	title: string,
	spentTimes: string[] | DataBaseSpentTimeData[]
}

export function isDataBaseTaskShortData(val: DataBaseTaskShortData | unknown): val is DataBaseTaskShortData {
	return val.spentTimes !== undefined && val.id !== undefined && val.title !== undefined
}
export interface DataBaseTaskData extends DataBaseTaskShortData {
	codeName: string,
	description: string,
	expectedSpentTime: number,
	createdAt: string,
	state: DataBaseStateData,
	owner: DataBaseUserData,
	executor: DataBaseUserData,
}

export type DataBaseTaskDataKeys = keyof DataBaseTaskData

export interface DataBaseTasksWhithPaginationData {
	lastPage: number
	content: DataBaseTaskData[]
}
export interface AppFormTaskData {
	// id: string,
	title: string,
	codeName: string,
	description: string,
	stateId: string,
	ownerId?: string,
	executorId?: string,
}
