import styled from 'styled-components';
import { AppComponentsPropsBase, DataBaseProjectData } from '@/types';
import { SkeletonLoader } from '@/components';
import { useAppSelector } from '@/hooks/use-app-store';
import { selectIsProjectLoading } from '@/selectors';

interface ProjectTitleProps extends AppComponentsPropsBase {
	project: DataBaseProjectData;
}

const ProjectTitleContainer = ({ className, project }: ProjectTitleProps) => {
	const isProjectLoading = useAppSelector(selectIsProjectLoading);

	return (
		<div className={className}>
			<SkeletonLoader type="article" loading={isProjectLoading} />
			{!isProjectLoading && (
				<div className="content">
					<div className="title">{project.title}</div>
					<div>Статус :</div>
					<div>{project.state && project.state.text}</div>
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
