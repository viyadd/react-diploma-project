export type DateFormat = 'date' | 'datetime' | 'time';

const formatDateToDMG = (date: string) => date.slice(0, 10).split('-').reverse().join('.')

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
	switch (type) {
		case "date":
			return formatDateToDMG(date)
		case "datetime":
			return formatDateToDMGTime(date)
		case "time":
			return formatDateToTime(date)
	}
}

