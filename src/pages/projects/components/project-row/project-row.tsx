import styled from 'styled-components';
import { AppComponentsPropsBase } from '../../../../shared/interfaces';
import { TableRow } from '../table-row/table-row';
import { AppStateData } from '../../../../bff/shared/model';
import { IconButton } from '../../../../components';
import { useNavigate } from 'react-router-dom';

export interface ProgectRowProps extends AppComponentsPropsBase {
	id: string;
	title: string;
	createdAt: string;
	state?: AppStateData | null;
	description: string;
}

const ProgectRowContainer = ({
	className,
	id,
	title,
	createdAt,
	description,
	state,
}: ProgectRowProps) => {
	const navigate = useNavigate()
	// const params = useParams();
  // const isCreating = !!useMatch('/projects');
  // const isEditing = !!useMatch('/projects/:id/edit');

	const onProjectEdit = (id: string) => {
		navigate(`/project/${id}/edit`)
	};

	return (
		<div className={className}>
			<TableRow border>
				<div className="title-column">{title}</div>
				<div className="created-at-column">{createdAt}</div>
				<div className="state-column">{state ? state.text : '-'}</div>
				<div className="description-column">{description}</div>
				<IconButton
					id="fa-pencil"
					margin="0 0 0 10px"
					onClick={() => onProjectEdit(id)}
				/>
			</TableRow>
		</div>
	);
};

export const ProjectRow = styled(ProgectRowContainer)`
	display: flex;
	margin-top: 10px;
`;
