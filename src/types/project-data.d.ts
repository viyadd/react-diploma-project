import { AppStateData, DataBaseStateData } from "../../../types/state-data"
import { DataBaseUserData } from "../../../types/user-data"

export interface DataBaseProjectData {
	id: string,
	title: string,
	description: string,
	createdAt: string,
	state: DataBaseStateData,
	owner: DataBaseUserData,
	executor: DataBaseUserData,
	tasks: string[]
}
export type DataBaseProjectDataKeys = keyof DataBaseProjectData

export interface AppProjectBaseData {
	id: string,
	title: string,
	description: string,
	createdAt: string,
	stateId: string,
}

export interface AppProjectSaveData extends AppProjectBaseData {
	createdAt?: string,
}

export interface AppProjectData extends AppProjectBaseData {
		state?: AppStateData | null
}

