import styled from 'styled-components';
import { AppComponentsPropsBase } from '../../shared/interfaces';

interface IconButton extends AppComponentsPropsBase {
	id: string;
	margin?: string;
	disabled?: boolean;
	onClick?: React.MouseEventHandler<HTMLElement> | undefined;
}
const IconButtonContainer = ({ className, id, onClick, disabled }: IconButton) => {
	return (
		<div className={className}>
			<i
				className={`fa ${id}`}
				aria-hidden="true"
				onClick={disabled ? undefined : onClick}
			></i>
		</div>
	);
};

export const IconButton = styled(IconButtonContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: ${({ margin = '0' }) => margin};
	color: ${({ disabled }) => (disabled ? '#969696' : '#3b6a94')};
	font-size: 20px;
	width: 26px;
	height: 26px;

	:hover {
		cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
	}
`;
