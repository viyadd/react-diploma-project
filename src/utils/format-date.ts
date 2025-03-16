export type DateFormat = 'date' | 'dateYMD' | 'datetime' | 'time';

const formatDateToDMG = (date: string) => date.slice(0, 10).split('-').reverse().join('.')

const formatDateToYMD = (date: string) => date.slice(0, 10)

const formatDateToTime = (date: string) => date.slice(11, 16)

const formatDateToDMGTime = (date: string) => `${formatDateToDMG(date)} ${formatDateToTime(date)}`
/**
 * форматирует строку даты '2025-03-06T11:16:59.060Z' ISO 8601 в DD.MM.GGGG | DD.MM.GGGG HH:MM | HH:MM
 *
 * @export
 * @param {string} date
 * @param {DateFormat} type
 * @return {*}  {string}
 */
export function formatDate(date: string, type: DateFormat): string {
	if(typeof date !== 'string' || date.length<21) {
		return '?'
	}
	switch (type) {
		case "date":
			return formatDateToDMG(date)
		case "dateYMD":
			return formatDateToYMD(date)
		case "datetime":
			return formatDateToDMGTime(date)
		case "time":
			return formatDateToTime(date)
	}
}

