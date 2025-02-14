import { AppStateData } from "./state-data"
import { AppUserData } from "./user-data"

interface DataBaseTaskData {
	id: string,
	title: string,
	description: string,
	created_at: string,
	state_id: string,
	code_name: string,
	owner_id: string,
	executor_id: string,
}
export type DataBaseTaskDataKeys = keyof DataBaseTaskData

export interface AppTaskBaseData {
	id: string,
	title: string,
	description: string,
	createdAt: string,
	codeName: string,
	stateId: string,
	ownerId: string,
	executorId: string,
}

export interface AppTaskData extends AppTaskBaseData {
	state?: AppStateData | null
	owner?: AppUserData | null,
	executor?: AppUserData | null
}

