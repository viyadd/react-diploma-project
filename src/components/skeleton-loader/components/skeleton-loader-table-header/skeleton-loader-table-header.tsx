import styled from 'styled-components';
import { AppComponentsPropsBase } from '../../../../types';

interface SkeletonLoaderTableHeaderProps extends AppComponentsPropsBase {
	loading?: boolean;
	rows?: number;
	columns?: number;
	width?: string;
}

const SkeletonLoaderTableHeaderContainer = ({
	className,
	loading,
	rows,
	columns,
}: SkeletonLoaderTableHeaderProps) => {
	if (!loading) {
		return;
	}

	const calccalculateElements = (r = 1, c = 6) => {
		return Array(r * c).fill('.');
	};
	return (
		<div className={className}>
			{calccalculateElements(rows, columns).map((w, i) => (
				<div className="loader" key={w + i}></div>
			))}
		</div>
	);
};

const calccalculateGridRows = ({ rows = 1 }: SkeletonLoaderTableHeaderProps) =>
	`repeat(${rows}, auto)`;

const calccalculateGridColumns = ({ columns = 6 }: SkeletonLoaderTableHeaderProps) => {
	const columnsOptions = `repeat(${columns}, auto)`;
	return columnsOptions;
};

export const SkeletonLoaderTableHeader = styled(SkeletonLoaderTableHeaderContainer)`
	display: grid;
	grid-template-columns: ${calccalculateGridColumns};
	grid-template-rows: ${calccalculateGridRows};
	width: ${({ width = '1000px' }) => width};
	margin-bottom: 6px;
	gap: 6px;

	.loader {
		width: 70%;
		height: 13px;
		background: linear-gradient(90deg, #0001 33%, #0005 50%, #0001 66%) #f2f2f2;
		background-size: 300% 100%;
		animation: l1 1s infinite linear;
		border-radius: 6px;
	}
	@keyframes l1 {
		0% {
			background-position: right;
		}
	}
`;
