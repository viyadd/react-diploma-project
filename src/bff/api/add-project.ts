import { generateDate, getUrl } from "../shared/lib";
import { transformProject } from "../transformers";
interface AddProjectData {
	title: string,
	description: string,
	stateId: string,
}

export const addProject = ({ title, description, stateId }: AddProjectData) =>
	fetch(getUrl('/projects'), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			title,
			created_at: generateDate(),
			description,
			state_id: stateId
		}),
	})
		.then((createdProgect) => createdProgect.json()
			.then((createdProgect) => !!createdProgect && transformProject(createdProgect)));
