import { AppStateData } from "./state-data"

interface DataBaseProjectData {
	id: string,
	title: string,
	description: string,
	created_at: string,
	state_id: string,
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

