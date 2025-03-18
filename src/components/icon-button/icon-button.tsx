import styled from 'styled-components';
import { AppComponentsPropsBase } from '../../types';
import { Tooltip } from '../tooltip/tooltip';

interface IconButton extends AppComponentsPropsBase {
	id: string;
	margin?: string;
	disabled?: boolean;
	tooltip?: string;
	iconSize?: string;
	onClick?: React.MouseEventHandler<HTMLElement> | undefined;
}
const IconButtonContainer = ({
	className,
	id,
	tooltip,
	onClick,
	disabled,
}: IconButton) => {
	return (
		<div className={className}>
			{tooltip !== undefined && (
				<Tooltip text={tooltip}>
					<i
						className={`fa ${id}`}
						aria-hidden="true"
						onClick={disabled ? undefined : onClick}
					/>
				</Tooltip>
			)}
			{tooltip === undefined && (
				<i
					className={`fa ${id}`}
					aria-hidden="true"
					onClick={disabled ? undefined : onClick}
				/>
			)}
		</div>
	);
};

export const IconButton = styled(IconButtonContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: ${({ margin = '0' }) => margin};
	color: ${({ disabled }) => (disabled ? '#969696' : '#3b6a94')};
	font-size: ${({iconSize = '20px'}) => iconSize};
	width: ${({iconSize = '26px'}) => iconSize};
	height: ${({iconSize = '26px'}) => iconSize};

	:hover {
		cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
	}
`;
