import styled from 'styled-components';
import { AppComponentsPropsBase, DataBaseTaskData } from '@/types';
import { useAppSelector } from '@/hooks/use-app-store';
import { selectIsTaskLoading } from '@/selectors';
import { SelectStatus, SkeletonLoader } from '@/components';
import { useTaskSaver } from '@/hooks';

interface ProjectTitleProps extends AppComponentsPropsBase {
	task: DataBaseTaskData;
	onUpdate: (task: DataBaseTaskData | null) => void;
}

const TaskTitleContainer = ({ className, task, onUpdate }: ProjectTitleProps) => {
	const isTaskLoading = useAppSelector(selectIsTaskLoading);
	const taskSaver = useTaskSaver()

	const handleOnSave = async (newStatusId: string) => {
		if (typeof task.id === 'string' && typeof newStatusId === 'string') {
			const newTask = await taskSaver.save({
				taskId: task.id,
				data: { state: newStatusId },
			});
			onUpdate(newTask);
		}
	};

	return (
		<div className={className}>
			<SkeletonLoader type="article" loading={isTaskLoading} />
			{!isTaskLoading && (
				<div className="content">
					<div className="title">Просмотр данных задачи</div>
					<div>Название :</div>
					<div>{task.title}</div>
					<div>Статус :</div>
					<SelectStatus
						statusId={task.state.id}
						isLoading={taskSaver.isTaskLoading}
						onSave={handleOnSave}
					/>
					<div>Описание :</div>
					<div>{task.description}</div>
				</div>
			)}
		</div>
	);
};

export const TaskTitle = styled(TaskTitleContainer)`
	& .content {
		display: grid;
		grid-template-columns: 1fr 5fr;
		grid-template-rows: 2fr 1fr 1fr;
		width: 600px;
		margin-top: 20px;
	}
	& .title {
		grid-column: 1/3;
	}

	& .title {
		text-align: center;
		font-size: 33px;
	}
`;
