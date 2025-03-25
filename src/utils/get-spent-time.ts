
export function getSpentTime(dateSart: string, dateEnd: string) {
	const start = new Date(dateSart)
	const end  = new Date(dateEnd)
	const dif  = end.getTime() - start.getTime()
	const m = Math.floor(dif/1000/60)
	return `${m}`
}
