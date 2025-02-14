import styled from 'styled-components';
import { AppComponentsPropsBase } from '../../../../shared/interfaces';

const ViewProjectContainer = ({ className }: AppComponentsPropsBase) => {
	return <div className={className}>V</div>;
};

export const ViewProject = styled(ViewProjectContainer)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
