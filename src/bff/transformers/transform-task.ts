import { unknownToString } from "../shared/lib";
import { AppTaskData, DataBaseTaskDataKeys } from "../shared/model";

export const transformTask = (
	dbProject: Record<DataBaseTaskDataKeys, unknown>): AppTaskData => ({
		id: unknownToString(dbProject.id),
		title: unknownToString(dbProject.title),
		description: unknownToString(dbProject.description),
		createdAt: unknownToString(dbProject.created_at),
		stateId: unknownToString(dbProject.state_id),
		codeName: unknownToString(dbProject.code_name),
		ownerId: unknownToString(dbProject.owner_id),
		executorId: unknownToString(dbProject.executor_id)
	});
