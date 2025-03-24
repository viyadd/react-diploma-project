import { DataBaseStateData } from "./state-data"
import { DataBaseTaskData } from "./task-data"

export interface DBStatusAlyticsData extends DataBaseStateData {
	count: number
}

export function isValueStatusAnalyticsData(val: unknown): val is DBStatusAlyticsData {
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

interface DBAnalyticsTaskData extends DataBaseTaskData {
	spentTimeDuration: number
}

const taskDataKeyList: DataBaseTaskDataKeys[] = ['id', 'spentTimeDuration']

export function isValueDBAnalyticsTaskData(val: unknown): val is DBAnalyticsTaskData {
	if (val === undefined || val === null || typeof val !== 'object') {
		return false
	}
	const objKeys = Object.keys(val)
	if (objKeys.length === 0) {
		return false
	}
	return taskDataKeyList.every(key => objKeys.includes(key))
}

interface DBProjectTasksAnalyticsData {
	taskList: DBAnalyticsTaskData[],
	statusList: DBStatusAlyticsData[]
}

export function isValueDBProjectTasksAnalyticsData(val: unknown): val is DBProjectTasksAnalyticsData {
	if (val === undefined || val === null || typeof val !== 'object') {
		return false
	}
	const v = val as DBProjectTasksAnalyticsData
	return (Array.isArray(v.taskList) && Array.isArray(v.statusList))
}
