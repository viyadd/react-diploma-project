import { getProject, getStates } from "../api";
import { AppRole } from "../constants";
import { sessions } from "../sessions";
import { AppProjectData, AppStateData, ProjectProjections } from "../shared/model";

const accessRoles = [AppRole.Admin];

const extensionProjectWithState = ({ stateId, ...etc }:AppProjectData, stateList: AppStateData[]) => {
	const stateItem = stateList.find((w) => w.id === stateId)
		if (stateItem) {
			return { ...etc, stateId, state: stateItem }
		} else {
			return { ...etc, stateId, state: null }
		}
}

const projectWithStates = async (id: string) => {
	const [project, stateList] = await Promise.all([getProject(id), getStates()])
	// const data = await getProjects()
	if( project===null) {
		return {
			error: `Record with id=${id} was'n founded `,
			data: null
		}
	}
	const data = extensionProjectWithState(project, stateList)
	return {
		error: null,
		data,
	}
}

export const fetchProject = async (
	hash: string, { projection, id }: { projection?: ProjectProjections, id: string }) => {
	const { access, res } = await sessions.accessCheck(hash, accessRoles);

	if (!access) {
		return res;
	}

	switch (projection) {
		case ProjectProjections.ProjectWithStates:
			return projectWithStates(id)
		default:
			{
				const data = await getProject(id)
				return {
					error: null,
					data,
				}
			}
	}
}
