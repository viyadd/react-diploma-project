import { addProject, updateProject } from "../api";
import { AppRole } from "../constants";
import { sessions } from "../sessions";
import { AppProjectSaveData } from "../shared/model";

export const saveProject = async (hash: string, newProjectData: AppProjectSaveData) => {
	const accessRoles = [AppRole.Admin, AppRole.User];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			data: null,
		};
	}
	const savedProject =
		newProjectData.id === '' ? await addProject(newProjectData) : await updateProject(newProjectData);

	return {
		error: null,
		data: savedProject,
	};
};
