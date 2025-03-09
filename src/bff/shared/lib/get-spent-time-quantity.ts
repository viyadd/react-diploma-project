import { AppSpentTimeListBaseData } from "../../../types"

const transformStringToTime = (stringTime: string): Date => {
	console.log('transformStringToTime', stringTime)
	return new Date()
}

const getSpentTime = (startedDate: string, endedDate: string) => {
	const dateS = transformStringToTime(startedDate)
	const dateE = transformStringToTime(endedDate)
	console.log('getSpentTime', { startedDate, endedDate, dateS, dateE })
	return [dateS, dateE]
}


export const getSpentTimeQuantity = (spentTimeList: AppSpentTimeListBaseData[], taskId: string) => {
	const spentTimeQuantity = spentTimeList
		.filter(({ taskId: spentTimeTaskId }) => spentTimeTaskId === taskId)
		.map(({ endedAt, startedAt }) => getSpentTime(startedAt, endedAt))
	// .reduce()
	return spentTimeQuantity
}
