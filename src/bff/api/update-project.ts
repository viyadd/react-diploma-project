import { getUrl } from "../shared/lib";
import { AppProjectSaveData } from "../shared/model";

export const updateProject = ({ id, title, description, stateId }: AppProjectSaveData) =>
	fetch(getUrl('/projects', { id }), {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			title,
			description,
			state_id: stateId
		}),
	}).then((loadedProject) => loadedProject.json());;
