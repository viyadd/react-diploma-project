import { DataBaseSpentTimeData } from "./spent-time"
import { DataBaseStateData } from "./state-data"
import { DataBaseUserData } from "./user-data"

export interface DataBaseTaskData {
	id: string,
	title: string,
	codeName: string,
	description: string,
	createdAt: string,
	state: DataBaseStateData,
	owner: DataBaseUserData,
	executor: DataBaseUserData,
	spentTimes: DataBaseSpentTimeData[]
}

export type DataBaseTaskDataKeys = keyof DataBaseTaskData

export interface DataBaseTasksWhithPaginationData {
	lastPage: number
	content: DataBaseTaskData[]
}
// export interface AppTaskBaseData {
// 	id: string,
// 	title: string,
// 	description: string,
// 	createdAt: string,
// 	projectId: string,
// 	codeName: string,
// 	stateId: string,
// 	ownerId: string,
// 	executorId: string,
// }

// export interface AppTaskData extends AppTaskBaseData {
// 	state?: AppStateData | null
// 	owner?: AppUserData | null,
// 	executor?: AppUserData | null
// }

