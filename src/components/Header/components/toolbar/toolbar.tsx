import styled from 'styled-components';
import { IconButton } from '../../../iconButton/iconButton';

const ToolbarContainer = ({ className }: { className?: string }) => {
	return (
		<div className={className}>
			<div className="buttons">
				<IconButton id="fa-plus" />
			</div>
			<div className="options">
				<div>User</div>
			</div>
		</div>
	);
};

export const Toolbar = styled(ToolbarContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 19px;

	& .buttons {
		display: flex;
		align-items: center;
	}

	& .options {
		display: flex;
		margin-right: 9px;
	}
`;
