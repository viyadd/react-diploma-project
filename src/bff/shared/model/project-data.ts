import { AppStateData } from "./state-data"

export type DataBaseProjectDataKeys = 'id' | 'title' | 'description' | 'created_at' | 'state_id'

export interface AppProjectData {
	id: string,
	title: string,
	description: string,
	createdAt: string,
	stateId: string,
	state?: AppStateData | null
}
