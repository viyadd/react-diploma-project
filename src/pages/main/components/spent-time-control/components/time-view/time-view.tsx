import { AppComponentsPropsBase } from '@/types';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface TimeViewProps extends AppComponentsPropsBase {
	time: number | null;
	color?: string
}
const formatXX = (value: number) => (value < 10 ? '0' + value : value.toString());

// const formatMsToSS = (time: number | null) => {
// 	if (typeof time === 'number') {
// 		const timeS = Math.round(time / 1000);
// 		const timeSS = timeS % 60;
// 		return `${formatXX(timeSS)}`;
// 	}
// 	return '00';
// };
const formatMsToMM = (time: number | null) => {
	if (typeof time === 'number') {
		const timeMM = Math.floor(time / 60000);
		return `${formatXX(timeMM)}`;
	}
	return '00';
};
const formatMsToHH = (time: number | null) => {
	if (typeof time === 'number') {
		const timeMM = Math.floor(time / 3600000);
		return `${formatXX(timeMM)}`;
	}
	return '00';
};

const TimeViewContainer = ({ className, time }: TimeViewProps) => {
	const [progress, setProgress] = useState(0)

	useEffect(()=>{
		if(typeof time!== 'number') {
			setProgress(0)
			return
		}
		setProgress(Math.ceil(time/1000%60))
	},[time])

	return (
		<div className={className}>
			<div>{formatMsToHH(time)}</div>
			<div>:</div>
			<div>{formatMsToMM(time)}</div>
			{/* <div>:</div>
			<div>{formatMsToSS(time)}</div> */}
			<progress value={progress} max="60"></progress>
		</div>
	);
};

export const TimeView = styled(TimeViewContainer)`
	display: grid;
	grid-template-columns: repeat(3, auto);
	grid-template-rows: 33px 7px;
	font-size: 23px;
	gap: 3px;

	& > progress {
		height: 6px;
		width: 100%;
		grid-column: 1/-1;
		grid-row: 2/2;
	}
`;
