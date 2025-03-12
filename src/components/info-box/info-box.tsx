import { AppComponentsProps } from '@/types';
import styled from 'styled-components';

interface InfoBoxProps extends AppComponentsProps {
	label?: string;
	// value: string
}

const InfoBoxContainer = ({ className, label, children }: InfoBoxProps) => {
	return (
		<div className={className}>
			<div className="label">{label}</div>
			<div>{children}</div>
		</div>
	);
};

export const InfoBox = styled(InfoBoxContainer)`
	position: relative;
	box-sizing: border-box;
	border: 1px solid #ddd;
	padding: 3px 6px;

	& .label {
		font-size: 13px;
		position: absolute;
		padding: 0 3px;
		background-color: #fff;
		color: #666;
		top: -11px;
	}
`;
