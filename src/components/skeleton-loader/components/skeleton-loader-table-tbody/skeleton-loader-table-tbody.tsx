import styled from 'styled-components';
import { AppComponentsPropsBase } from '../../../../types';

interface SkeletonLoaderTableBbodyProps extends AppComponentsPropsBase {
	loading?: boolean;
	rows?: number;
	columns?: number;
	width?: string;
}

const SkeletonLoaderTableBbodyContainer = ({
	className,
	loading,
	rows,
	columns,
}: SkeletonLoaderTableBbodyProps) => {
	if (!loading) {
		return;
	}

	const calccalculateElements = (r = 10, c = 6) => {
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

const calccalculateGridRows = ({ rows = 10 }: SkeletonLoaderTableBbodyProps) =>
	`repeat(${rows}, auto)`;

const calccalculateGridColumns = ({ columns = 6 }: SkeletonLoaderTableBbodyProps) => {
	const columnsOptions = `repeat(${columns}, auto)`;
	return columnsOptions;
};

export const SkeletonLoaderTableBbody = styled(SkeletonLoaderTableBbodyContainer)`
	display: grid;
	grid-template-columns: ${calccalculateGridColumns};
	grid-template-rows: ${calccalculateGridRows};
	width: ${({ width = '1000px' }) => width};
	margin-top: 20px;
	gap: 6px;

	.loader {
		width: 100%;
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
