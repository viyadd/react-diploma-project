import { getUrl } from '../shared/lib';
import { transformProject } from '../transformers';

export const getProject = async (projectId: string) =>
	fetch(getUrl('/projects', { id: projectId })).then((loadedProject) =>
		loadedProject
			.json()
			.then((loadedProject) => loadedProject ? transformProject(loadedProject) : null),
	);
