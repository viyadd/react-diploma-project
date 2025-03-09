export type DataBaseStateDataKeys = 'id' | 'code' | 'text'

export interface AppStateData {
	id: string,
	code: string,
	text: string,
}
export interface DataBaseStateData extends AppStateData {
	createdAt: string,
}
