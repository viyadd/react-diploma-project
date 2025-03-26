import { DataBaseProjectShortData } from "../../types";

export const transformProjectsToOptionList = (projects: DataBaseProjectShortData[]) => {
	return projects.map((project) => {
		const { id: key, id: value, title, description } = project;
		return { key, value, text: `${title} (${description})` };
	});
};
