import styled from 'styled-components';
import { ComponentsProps } from '../../shared/interfaces';

const PageTitleContainer = ({ children, className }: ComponentsProps) => (
	<h2 className={className}>{children}</h2>
);

export const PageTitle = styled(PageTitleContainer)`
	margin: 35px 0;
`;
