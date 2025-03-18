import { DataBaseProjectShortData } from "../../types";

export const transformProjectsToOptionList = (projects: DataBaseProjectShortData[]) => {
	return projects.map((project) => {
		const { id: key, id: value, title: text } = project;
		return { key, value, text };
	});
};
