import styled from 'styled-components';
import { AppComponentsPropsBase, DataBaseProjectData } from '../../../../../../types';

interface ProjectTitleProps extends AppComponentsPropsBase {
	project: DataBaseProjectData;
}

const ProjectTitleContainer = ({ className, project }: ProjectTitleProps) => {
	return (
		<div className={className}>
			<div className="title">{project.title}</div>
			<div>Статус :</div>
			<div>{project.state && project.state.text}</div>
			<div>Описание :</div>
			<div>{project.description}</div>
		</div>
	);
};

export const ProjectTitle = styled(ProjectTitleContainer)`
	display: grid;
	grid-template-columns: 1fr 5fr;
	grid-template-rows: 2fr 1fr 1fr;
	width: 600px;
	margin-top: 20px;

	& .title {
		grid-column: 1/3;
	}

	& .title {
		text-align: center;
		font-size: 33px;
	}
`;
