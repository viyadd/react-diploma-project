import { AppComponentsProps } from '@/types';
import { useState } from 'react';
import styled from 'styled-components';
import { IconButton } from '../icon-button/icon-button';

interface HideBoxProps extends AppComponentsProps {
	label?: string;
	// value: string
}
const COLOR = '#46afff';

const HideBoxContainer = ({ className, label, children }: HideBoxProps) => {
	const [controlSwitch, setControlSwitch] = useState(false);
	return (
		<div className={className}>
			<div className="label">
				<div>{label}</div>
				<IconButton
					id={controlSwitch ? 'fa-angle-up' : 'fa-angle-down'}
					color={COLOR}
					onClick={() => setControlSwitch(!controlSwitch)}
				/>
			</div>
			{/* <div className="control-switch"></div> */}
			{controlSwitch && <div className="box">{children}</div>}
		</div>
	);
};

export const HideBox = styled(HideBoxContainer)`
	position: relative;
	box-sizing: border-box;
	/* padding: 3px 6px; */

	& .box {
		border-left: 1px solid ${COLOR};
		padding-left: 9px;
	}

	& .label,
	.control-switch {
		display: flex;
		/* position: absolute; */
		/* background-color: #fff; */
		color: ${COLOR};
		/* top: -11px; */
	}

	& .label {
		font-size: 13px;
		/* right: 0px; */
		padding: 0 3px;
		/* left: 0px; */
	}
	& .control-switch {
		width: 30px;
		right: 0px;
	}
`;
