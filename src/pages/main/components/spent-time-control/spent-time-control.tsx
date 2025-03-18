import { IconButton } from '@/components';
import {
	FSMHandleStateList,
	FSMOfSpentTimeHendeleOnStateChangeFunc,
	FSMStateList,
} from '@/hooks';
import { AppComponentsPropsBase } from '@/types';
import styled from 'styled-components';
import { TimeView } from './components';

interface SpentTimeControlProps extends AppComponentsPropsBase {
	timeWork: number | null;
	timePause: number | null;
	fsmState: FSMStateList;
	disabled?: boolean;
	onControlClick: FSMOfSpentTimeHendeleOnStateChangeFunc;
}

const isTimerWorking = (state: FSMStateList) => state === 'work' || state === 'pause';

interface ButtonList {
	key: FSMHandleStateList;
	iconId: string;
	isDisabled: (state: FSMStateList) => boolean;
}

const buttonList: ButtonList[] = [
	{
		key: 'start',
		iconId: 'fa-play-circle-o',
		isDisabled: (state: FSMStateList) => isTimerWorking(state),
	},
	{
		key: 'pause',
		iconId: 'fa-pause-circle-o',
		isDisabled: (state: FSMStateList) => !isTimerWorking(state),
	},
	{
		key: 'stop',
		iconId: 'fa-stop-circle-o',
		isDisabled: (state: FSMStateList) => !isTimerWorking(state),
	},
];

// const formatXX = (value: number) => (value < 10 ? '0' + value : value.toString());

// const formatMsToMMSS = (time: number | null) => {
// 	if (typeof time === 'number') {
// 		const timeS = Math.round(time / 1000);
// 		const timeSS = timeS % 60;
// 		const timeMM = Math.floor(timeS / 60);
// 		return `${formatXX(timeMM)}:${formatXX(timeSS)}`;
// 	}
// 	return '00:00';
// };

const MIN_WORK_TIME = 6000; //0

const isTimeTooLittle = (key: FSMHandleStateList, time: number | null) => {
	return key === 'stop' && (time === null || time < MIN_WORK_TIME);
};

const SpentTimeControlContainer = ({
	className,
	timeWork,
	timePause,
	fsmState,
	disabled,
	onControlClick,
}: SpentTimeControlProps) => {

	return (
		<div className={className}>
			<TimeView time={timeWork} />
			{buttonList.map(({ key, iconId, isDisabled }) => (
				<IconButton
					key={key}
					id={iconId}
					iconSize="43px"
					disabled={disabled || isDisabled(fsmState) || isTimeTooLittle(key, timeWork)}
					onClick={() => onControlClick(key)}
				/>
			))}
			<TimeView time={timePause} />
		</div>
	);
};

const calccalculateGridColumns = () => {
	return `100px repeat(${buttonList.length}, auto) 100px`;
};

export const SpentTimeControl = styled(SpentTimeControlContainer)`
	display: grid;
	grid-template-columns: ${calccalculateGridColumns};
	grid-template-rows: 1fr;
	align-items: center;
	gap: 9px;
`;
