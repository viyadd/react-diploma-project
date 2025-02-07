import { getUrl } from "../shared/lib";
import { AppProjectData, DataBaseProjectDataKeys } from "../shared/model";
import { transformProject } from "../transformers";

export const getProjects = ():Promise<AppProjectData[]> =>
	fetch(getUrl('/projects'))
		.then((loadedProjects) => loadedProjects.json())
		.then((loadedProjects) => loadedProjects && loadedProjects.map(
			(loadedUser: Record<DataBaseProjectDataKeys, unknown>) => transformProject(loadedUser)))
