import { AppComponentsProps } from '@/types';
import styled from 'styled-components';

// interface TitleProps extends AppComponentsProps {
// }

const TitleContainer = ({ className, children }: AppComponentsProps) => {
	return <div className={className}>{children}</div>;
};

export const Title = styled(TitleContainer)`
	background-color: #999;
	font-size: 20px;
	padding: 3px 9px;
	color: #fff;
	background-color: #2682f2;
`;
