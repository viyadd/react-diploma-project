// TODO rename state to status
export type DataBaseStateDataKeys = 'id' | 'code' | 'text'

export interface AppStateData {
	id: string,
	code: string,
	text: string,
}
export interface DataBaseStateData extends AppStateData {
	createdAt: string,
}

export interface DataBaseStatusAlyticsData extends DataBaseStateData {
	count: number
}

export function isValueStatusAnalyticsData(val: unknown): val is DataBaseStatusAlyticsData {
	if (val === undefined || val === null) {
		return false
	}
	return (
		typeof val === 'object' &&
		typeof val.id === 'string' &&
		typeof val.code === 'string' &&
		typeof val.text === 'string' &&
		typeof val.count === 'number' &&
		typeof val.createdAt === 'string'
	)
}
