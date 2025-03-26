import { DataBaseTaskShortData } from "../../types";


export const transformTasksToOptionList = (dataList: DataBaseTaskShortData[]) => {
	return dataList.map((data) => {
		const { id: key, id: value, title, codeName } = data;
		return { key, value, text: `${codeName} (${title})` };
	});
}
