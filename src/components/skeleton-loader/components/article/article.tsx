import styled from 'styled-components';
import { AppComponentsPropsBase } from '../../../../types';

interface ArticleProps extends AppComponentsPropsBase {
	loading?: boolean;
	rows?: number;
	columns?: number;
}

const ArticleContainer = ({
	className,
	loading,
	rows,
}: ArticleProps) => {
	if (!loading) {
		return;
	}

	const calccalculateElements = (r = 4) => {
		return Array(r).fill('.');
	};
	return (
		<div className={className}>
			{calccalculateElements(rows).map((w,i) => (
				<div className={"loader" + (i===0 ? ' title': '')} key={w+i}></div>
			))}
		</div>
	);
};

export const Article = styled(ArticleContainer)`
	display: flex;
	flex-direction: column;
	width: 1000px;
	margin-top: 20px;
	gap: 9px;

	.loader {
		width: 45%;
		height: 13px;
		background: linear-gradient(90deg, #0001 33%, #0005 50%, #0001 66%) #f2f2f2;
		background-size: 300% 100%;
		animation: l1 1s infinite linear;
		border-radius: 6px;
	}

	& .title {
		height: 40px;
		width: 50%;
	}

	@keyframes l1 {
		0% {
			background-position: right;
		}
	}
`;
