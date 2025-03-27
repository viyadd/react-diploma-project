import styled from 'styled-components';
import { AppComponentsPropsBase, DataBaseProjectData } from '@/types';
import { SelectStatus, SkeletonLoader } from '@/components';
import { useAppSelector } from '@/hooks/use-app-store';
import { selectIsProjectLoading } from '@/selectors';
import { useProjectSaver } from '@/hooks';

interface ProjectTitleProps extends AppComponentsPropsBase {
	project: DataBaseProjectData;
	onUpdate: (project: DataBaseProjectData | null) => void;
}

const ProjectTitleContainer = ({ className, project, onUpdate }: ProjectTitleProps) => {
	const isProjectLoading = useAppSelector(selectIsProjectLoading);

	const projectSaver = useProjectSaver();

	const handleOnSave = async (newStatusId: string) => {
		if (typeof project.id === 'string' && typeof newStatusId === 'string') {
			const newProject = await projectSaver.save({
				projectId: project.id,
				data: { state: newStatusId },
			});
			onUpdate(newProject);
		}
	};

	return (
		<div className={className}>
			<SkeletonLoader type="article" loading={isProjectLoading} />
			{!isProjectLoading && (
				<div className="content">
					<div className="title">Просмотр данных проекта</div>
					<div>Название :</div>
					<div>{project.title}</div>
					<div>Статус :</div>
					<SelectStatus
						statusId={project.state.id}
						isLoading={projectSaver.isProjectLoading}
						onSave={handleOnSave}
					/>
					<div>Описание :</div>
					<div>{project.description}</div>
				</div>
			)}
		</div>
	);
};

export const ProjectTitle = styled(ProjectTitleContainer)`
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
