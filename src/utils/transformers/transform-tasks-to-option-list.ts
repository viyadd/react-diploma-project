import { DataBaseTaskShortData } from "../../types";


export const transformTasksToOptionList = (dataList: DataBaseTaskShortData[]) => {
	return dataList.map((data) => {
		const { id: key, id: value, title: text } = data;
		return { key, value, text };
	});
}
