import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useServerAuthorization } from '../../../../hooks';
import {
	AppComponentsPropsBase,
	DataBaseProjectData,
	DataBaseTaskData,
	DataBaseTasksWhithPaginationData,
} from '../../../../types';
import { ProjectTitle, TaskList } from './components';
import styled from 'styled-components';
import { request } from '../../../../utils';
// import { Pagination } from '../../../../components';

const ViewProjectContainer = ({ className }: AppComponentsPropsBase) => {
	const [project, setProject] = useState<DataBaseProjectData | null>(null);
	const [tasks, setTasks] = useState<DataBaseTaskData[] | null>(null);

	const params = useParams();

	const serverAuth = useServerAuthorization();

	useEffect(() => {
		const { id } = params;
		if (id === undefined) {
			return;
		}
		request(`/projects/${id}`).then((loadedProject) => {
			console.log('loadedProject--', { loadedProject });
			if (loadedProject.error) {
				console.log('не удалось загрузить проект', loadedProject.error);
				return;
			}
			const currentProject = loadedProject.data as DataBaseProjectData;
			setProject(currentProject);
			const taskList = currentProject.tasks;
			console.log('tasks >>', taskList);
			if (taskList.length > 0) {
				request(`/tasks?${taskList.map((id) => 'id=' + id).join('&')}`).then(
					(loadedTasks) => {
						if (loadedTasks.error) {
							console.log('не удалось загрузить задачи', loadedTasks.error);
							return;
						}
						const currentTaskList = loadedTasks.data as DataBaseTasksWhithPaginationData;
						setTasks(currentTaskList.content);
						console.log(currentTaskList.content);
					},
				);
			}
		});
	}, [params, serverAuth]);

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
