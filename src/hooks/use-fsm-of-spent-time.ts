import { useEffect, useMemo, useState } from "react";

export type FSMHandleStateList = 'start' | 'pause' | 'stop';

export type FSMStateList = null | 'work' | 'pause' | 'stopped';

export interface FSMOfSpentTimeHendeleOnStateChangeFunc {
	(key: FSMHandleStateList): void
}

const debonce = (fn: (state: FSMStateList) => void, delay: number) => {
	let timeoutId: NodeJS.Timeout | number | null;

	return (state: FSMStateList) => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		if (state === 'work') {
			timeoutId = setInterval(fn, delay, state);
		}
		if (state === 'pause') {
			timeoutId = setInterval(fn, delay, state);
		}
	};
};

const startTime = {
	work: 0,
	pause: 0,
}

export const useFSMOfSpentTime = () => {
	const [state, setState] = useState<FSMStateList>(null);
	const [timeWorkSS, setTimeWorkSS] = useState(0)
	const [timePauseSS, setTimePauseSS] = useState(0)
	const [workCurrentTime, setWorkCurrentTime] = useState(0)
	const [pauseCurrentTime, setPauseCurrentTime] = useState(0)
	const [workTime, setWorkTime] = useState(0)
	const [pauseTime, setPauseTime] = useState(0)


	const tickTock = (state: FSMStateList) => {
		const time = new Date().getTime()
		if (state === 'work') {
			setWorkCurrentTime(time)
		}
		if (state === 'pause') {
			setPauseCurrentTime(time)
		}
	}

	useEffect(() => {
		const currentWorkInterval = workCurrentTime - startTime.work
		setWorkTime(timeWorkSS + currentWorkInterval)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [workCurrentTime])

	useEffect(() => {
		const currentPauseInterval = pauseCurrentTime - startTime.pause
		setPauseTime(timePauseSS + currentPauseInterval)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pauseCurrentTime])

	const updateTimerState = useMemo(() => debonce(tickTock, 1000), []);

	const init = () => {
		setState(null)
		setTimeWorkSS(0)
		setWorkTime(0)
		setTimePauseSS(0)
		setPauseTime(0)
	}

	const calculateWorkTime = () => {
		const currentTime = new Date().getTime()
		const currentInterval = currentTime - startTime.work
		setTimeWorkSS(timeWorkSS + currentInterval)
	}
	const calculatePauseTime = () => {
		const currentTime = new Date().getTime()
		const currentInterval = currentTime - startTime.pause
		setTimePauseSS(timePauseSS + currentInterval)
	}

	const initNewWorkCycle = () => {
		const time = new Date().getTime()
		startTime.work = time
		setWorkCurrentTime(time)
		updateTimerState('work')
		setState('work')
	}

	const initNewPauseCycle = () => {
		const time = new Date().getTime()
		startTime.pause = time
		setPauseCurrentTime(time)
		updateTimerState('pause')
		setState('pause')
	}

	const start = () => {
		init()
		initNewWorkCycle()
	}

	const pause = () => {
		if (state === 'work') {
			calculateWorkTime()
			initNewPauseCycle()
		}
		if (state === 'pause') {
			calculatePauseTime()
			initNewWorkCycle()
		}
	}

	const stop = () => {
		updateTimerState('stopped')

		if (state === 'work') {
			calculateWorkTime()
		}
		if (state === 'pause') {
			calculatePauseTime()
		}
		setState('stopped')
	}

	const handleOnStateChange: FSMOfSpentTimeHendeleOnStateChangeFunc = (key) => {
		switch (key) {
			case 'start':
				start()
				return
			case 'pause':
				pause()
				return
			case 'stop':
				stop()
				return
		}
	}

	const getStartDate = () => {
		const time = workTime + (pauseTime ?? 0)
		return new Date(new Date().getTime() - time)
	}

	return {
		handleOnStateChange,
		getStartDate,
		workTime,
		pauseTime,
		state,
		start,
		pause,
		stop
	}
}
