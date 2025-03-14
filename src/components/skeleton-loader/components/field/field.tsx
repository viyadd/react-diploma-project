import styled from 'styled-components';
import { AppComponentsPropsBase } from '../../../../types';

interface FieldProps extends AppComponentsPropsBase {
	loading?: boolean;
}

const FieldContainer = ({ className, loading }: FieldProps) => {
	if (!loading) {
		return;
	}

	return (
		<div className={className}>
			<div className="loader field"></div>
		</div>
	);
};

export const Field = styled(FieldContainer)`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 18px;
	/* margin-top: 20px; */
	/* gap: 9px; */

	.loader {
		width: 45%;
		height: 13px;
		background: linear-gradient(90deg, #0001 33%, #0005 50%, #0001 66%) #f2f2f2;
		background-size: 300% 100%;
		animation: l1 1s infinite linear;
		border-radius: 6px;
	}

	& .field {
		box-sizing: border-box;
		/* height: 40px; */
		width: 100%;
	}

	@keyframes l1 {
		0% {
			background-position: right;
		}
	}
`;
