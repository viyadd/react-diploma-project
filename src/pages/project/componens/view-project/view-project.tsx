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
import { request } from '@/utils';
import { useAppDispatch } from '@/hooks/use-app-store';
import { SetProjectLoading, SetTaskListLoading } from '@/actions';
// import { Pagination } from '../../../../components';

const ViewProjectContainer = ({ className }: AppComponentsPropsBase) => {
	const [project, setProject] = useState<DataBaseProjectData | null>(null);
	const [tasks, setTasks] = useState<DataBaseTaskData[] | null>(null);

	const dispatch = useAppDispatch();

	const params = useParams();

	useEffect(() => {
		dispatch(SetProjectLoading(true));
		dispatch(SetTaskListLoading(true));
		const { id } = params;
		if (id === undefined) {
			dispatch(SetProjectLoading(false));
			dispatch(SetTaskListLoading(false));
			return;
		}

		request(`/projects/${id}`).then(async (loadedProject) => {
			if (loadedProject.error) {
				console.log('не удалось загрузить проект', loadedProject.error);
				dispatch(SetProjectLoading(false));
				dispatch(SetTaskListLoading(true));
				return;
			}

			const currentProject = loadedProject.data as DataBaseProjectData;
			setProject(currentProject);
			dispatch(SetProjectLoading(false));

			const taskList = currentProject.tasks;
			if (taskList.length > 0) {
				const loadedTasks = await request(
					`/tasks?${taskList.map((id) => 'id=' + id).join('&')}`,
				);
				if (loadedTasks.error) {
					console.log('не удалось загрузить задачи', loadedTasks.error);
					dispatch(SetTaskListLoading(false));
					return;
				}
				const currentTaskList = loadedTasks.data as DataBaseTasksWhithPaginationData;
				setTasks(currentTaskList.content);
				console.log(currentTaskList.content);
			}
			dispatch(SetTaskListLoading(false));
		});
	}, [dispatch, params]);

	return (
		<div className={className}>
			{project !== null && (
				<>
					<ProjectTitle project={project} />
					<TaskList taskList={tasks} />
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
