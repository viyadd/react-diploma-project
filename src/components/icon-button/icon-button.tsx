import styled from 'styled-components';

interface IconButton {
	className?: string;
	id: string;
	onClick?: React.MouseEventHandler<HTMLElement> | undefined;
}
const IconButtonContainer = ({ className, id, onClick }: IconButton) => {
	return (
		<div className={className}>
			<i className={`fa ${id}`} aria-hidden="true" onClick={onClick}></i>
		</div>
	);
};

export const IconButton = styled(IconButtonContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	color: #3b6a94;
	font-size: 20px;
	width: 26px;
	height: 26px;

	:hover {
		cursor: pointer;
	}
`;
