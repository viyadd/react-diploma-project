import { AppComponentsProps } from '@/types';
import styled from 'styled-components';

interface TooltipProps extends AppComponentsProps {
	text: string;
}

const TooltipContainer = ({ className, text, children }: TooltipProps) => {
	return (
		<div className={className}>
			<div className="tooltip">
				{children}
				<span className="tooltiptext">{text}</span>
			</div>
		</div>
	);
};

export const Tooltip = styled(TooltipContainer)`
	/* Tooltip container */
	.tooltip {
		position: relative;
		display: inline-block;
		/* border-bottom: 1px dotted black; */
	}

	/* Tooltip text */
	.tooltip .tooltiptext {
		visibility: hidden;
		width: 120px;
		background-color: #333;
		color: #fff;
		text-align: center;
		font-size: 14px;
		padding: 5px 0;
		border-radius: 6px;

		/* Position the tooltip text */
		position: absolute;
		z-index: 1;
		/* bottom: 125%;
		left: 50%;
		margin-left: -60px; */

		/* Fade in tooltip */
		opacity: 0;
		transition: opacity 0.3s;
	}

	.tooltip .tooltiptext {
		width: 120px;
		top: 100%;
		left: 50%;
		margin-left: -60px;
	}

	/* Tooltip arrow */
	/* .tooltip .tooltiptext::after {
		content: '';
		position: absolute;
		top: 100%;
		left: 50%;
		margin-left: -5px;
		border-width: 5px;
		border-style: solid;
		border-color: #555 transparent transparent transparent;
	} */
	.tooltip .tooltiptext::after {
		content: ' ';
		position: absolute;
		bottom: 100%;
		left: 50%;
		margin-left: -5px;
		border-width: 5px;
		border-style: solid;
		border-color: transparent transparent black transparent;
		opacity: 0.77;
	}

	.tooltip:hover .tooltiptext {
		visibility: visible;
		opacity: 0.77;
	}
`;
