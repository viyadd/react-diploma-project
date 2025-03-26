import { AppStateData, DataBaseStateData } from "../../../types/state-data"
import { DataBaseUserData } from "../../../types/user-data"
import { DataBaseTaskData } from "./task-data"

export interface DataBaseProjectShortData {
	id: string,
	title: string,
	description: string,
	tasks: string[] | DataBaseTaskData[]
}

export function isDataBaseProjectShortData(val: unknown): val is DataBaseProjectShortData {
	if (val === undefined || val === null) {
		return false
	}
	return typeof val === object && val.tasks !== undefined && val.id !== undefined && val.title !== undefined
}
export interface DataBaseProjectData extends DataBaseProjectShortData{
	description: string,
	createdAt: string,
	state: DataBaseStateData,
	owner: DataBaseUserData,
	executor: DataBaseUserData,
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

