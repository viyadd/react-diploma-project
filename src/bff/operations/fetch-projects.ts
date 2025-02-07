import { getStates } from "../api";
import { getProjects } from "../api/get-projects";
import { AppRole } from "../constants";
import { sessions } from "../sessions";
import { ProjectsProjections } from "../shared/model";

const accessRoles = [AppRole.Admin];

const projectsWithStates = async () => {
	const [projectList, stateList] = await Promise.all([getProjects(), getStates()])
	// const data = await getProjects()
	const data = projectList.map(({ stateId, ...etc }) => {
		const stateItem = stateList.find((w) => w.id === stateId)
		if (stateItem) {
			return { ...etc, stateId, state: stateItem }
		} else {
			return { ...etc, stateId, state: null }
		}
	})
	return {
		error: null,
		data,
	}
}

export const fetchProjects = async (hash: string, projection?: ProjectsProjections) => {
	const { access, res } = await sessions.accessCheck(hash, accessRoles);

	if (!access) {
		return res;
	}

	switch (projection) {
		case ProjectsProjections.ProjectsWithStates:
			return projectsWithStates()
		default:
			{
				const data = await getProjects()
				return {
					error: null,
					data,
				}
			}
	}
}
