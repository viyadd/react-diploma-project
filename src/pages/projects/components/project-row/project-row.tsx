import styled from 'styled-components';
import { TableRow } from '../table-row/table-row';
import { AppComponentsPropsBase, AppStateData } from '../../../../types';
import { IconButton } from '../../../../components';
import { Link } from 'react-router-dom';

export interface ProgectRowProps extends AppComponentsPropsBase {
	id: string;
	title: string;
	createdAt: string;
	state?: AppStateData | null;
	description: string;
	onProjectEdit: () => void;
}

const ProgectRowContainer = ({
	className,
	id,
	title,
	createdAt,
	description,
	state,
	onProjectEdit,
}: ProgectRowProps) => {
	return (
		<div className={className}>
			<TableRow border>
				<div className="title-column">
					<Link className='' to={'/project/' + id}>{title}</Link>
				</div>
				<div className="created-at-column">{createdAt}</div>
				<div className="state-column">{state ? state.text : '-'}</div>
				<div className="description-column">{description}</div>
				<IconButton id="fa-pencil" margin="0 0 0 10px" onClick={() => onProjectEdit()} />
			</TableRow>
		</div>
	);
};

export const ProjectRow = styled(ProgectRowContainer)`
	display: flex;
	margin-top: 10px;

	& .title-column a {
		text-decoration: none;
	}
`;
