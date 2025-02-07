import { unknownToString } from "../shared/lib";
import { AppProjectData, DataBaseProjectDataKeys } from "../shared/model";

export const transformProject = (
	dbProject: Record<DataBaseProjectDataKeys, unknown>): AppProjectData => ({
		id: unknownToString(dbProject.id),
		title: unknownToString(dbProject.title),
		description: unknownToString(dbProject.description),
		createdAt: unknownToString(dbProject.created_at),
		stateId: unknownToString(dbProject.state_id),
	});
