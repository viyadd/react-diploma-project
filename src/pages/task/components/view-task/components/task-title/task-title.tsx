import styled from 'styled-components';
import { AppComponentsPropsBase, DataBaseTaskData } from '@/types';
import { useAppSelector } from '@/hooks/use-app-store';
import { selectIsTaskLoading } from '@/selectors';
import { SkeletonLoader } from '@/components';

interface ProjectTitleProps extends AppComponentsPropsBase {
	task: DataBaseTaskData;
}

const TaskTitleContainer = ({ className, task }: ProjectTitleProps) => {
	const isTaskLoading = useAppSelector(selectIsTaskLoading);
	console.log({ isTaskLoading });

	return (
		<div className={className}>
			<SkeletonLoader type="article" loading={isTaskLoading} />
			{!isTaskLoading && (
				<div className="content">
					<div className="title">{task.title}</div>
					<div>Статус :</div>
					<div>{task.state && task.state.text}</div>
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
