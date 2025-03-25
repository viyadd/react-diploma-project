import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
	AppComponentsPropsBase,
	DataBaseProjectData,
	DataBaseTaskData,
	DataBaseTasksWhithPaginationData,
} from '@/types';
import { ProjectTitle, TaskList } from './components';
import styled from 'styled-components';
import { pushSnackbarMessage, request } from '@/utils';
import { useAppDispatch } from '@/hooks/use-app-store';
import { setProjectLoading, setTaskListLoading } from '@/actions';
// import { Pagination } from '../../../../components';

const ViewProjectContainer = ({ className }: AppComponentsPropsBase) => {
	const [project, setProject] = useState<DataBaseProjectData | null>(null);
	const [tasks, setTasks] = useState<DataBaseTaskData[] | null>(null);
	const [updateData, setUpdateData] = useState(false);

	const dispatch = useAppDispatch();

	const params = useParams();

	useEffect(() => {
		dispatch(setProjectLoading(true));
		dispatch(setTaskListLoading(true));
		const { id } = params;
		if (id === undefined) {
			dispatch(setProjectLoading(false));
			dispatch(setTaskListLoading(false));
			return;
		}

		request(`/projects/${id}`).then(async (loadedProject) => {
			if (loadedProject.error) {
				pushSnackbarMessage.errorServerApi(loadedProject.error)
				dispatch(setProjectLoading(false));
				dispatch(setTaskListLoading(true));
				return;
			}

			const currentProject = loadedProject.data as DataBaseProjectData;
			setProject(currentProject);
			dispatch(setProjectLoading(false));

			const taskList = currentProject.tasks;
			if (taskList.length > 0) {
				const loadedTasks = await request(
					`/tasks?${taskList.map((id) => 'id=' + id).join('&')}`,
				);
				if (loadedTasks.error) {
					pushSnackbarMessage.errorServerApi(loadedTasks.error);
					dispatch(setTaskListLoading(false));
					return;
				}
				const currentTaskList = loadedTasks.data as DataBaseTasksWhithPaginationData;
				setTasks(currentTaskList.content);
			}
			dispatch(setTaskListLoading(false));
		});
	}, [dispatch, params, updateData]);

	const handleUpdateTask = (newTask: DataBaseTaskData) => {
		if (tasks === null) {
			setTasks([newTask]);
			return;
		}
		if (tasks.filter((task) => task.id === newTask.id).length === 0) {
			setUpdateData(!updateData);
		}
		const taskList = tasks.map((task) => {
			return task.id === newTask.id ? newTask : task;
		});

		setTasks([...taskList]);
	};

	return (
		<div className={className}>
			{project !== null && (
				<>
					<ProjectTitle project={project} />
					<TaskList taskList={tasks} onUpdateTask={handleUpdateTask} />
					{/* <Pagination /> */}
				</>
			)}
		</div>
	);
};

export const ViewProject = styled(ViewProjectContainer)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
