import styled from 'styled-components';
import { AppComponentsProps } from '../../types';

const PageTitleContainer = ({ children, className }: AppComponentsProps) => (
	<h2 className={className}>{children}</h2>
);

export const PageTitle = styled(PageTitleContainer)`
	margin: 35px 0;
`;
