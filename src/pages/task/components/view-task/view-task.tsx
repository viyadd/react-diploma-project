import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { pushSnackbarMessage, request } from '@/utils';
import {
	AppComponentsPropsBase,
	DataBaseSpentTimeData,
	DataBaseSpentTimeWhithPaginationData,
	DataBaseTaskData,
} from '@/types';
import { SpentTimeList, TaskTitle } from './components';
import { useAppDispatch } from '@/hooks/use-app-store';
import { setSpentTimeListLoading, setTaskLoading } from '@/actions';
// import { Pagination } from '../../../../components';

const ViewTaskContainer = ({ className }: AppComponentsPropsBase) => {
	const [task, setTask] = useState<DataBaseTaskData | null>(null);
	const [spentTimeList, setSpentTimeList] = useState<DataBaseSpentTimeData[] | null>(
		null,
	);
	const [updateData, setUpdateData] = useState(false);

	const params = useParams();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setTaskLoading(true));
		dispatch(setSpentTimeListLoading(true));
		const { id } = params;
		if (id === undefined) {
			dispatch(setTaskLoading(false));
			dispatch(setSpentTimeListLoading(false));
			return;
		}
		request(`/tasks/${id}`).then((loadedTask) => {
			if (loadedTask.error) {
				pushSnackbarMessage.errorServerApi(loadedTask.error);
				dispatch(setTaskLoading(false));
				dispatch(setSpentTimeListLoading(false));
				return;
			}
			const currentTask = loadedTask.data as DataBaseTaskData;
			setTask(currentTask);
			dispatch(setTaskLoading(false));

			const spentTimeList = currentTask.spentTimes;
			if (spentTimeList.length === 0) {
				dispatch(setSpentTimeListLoading(false));
			}

			if (spentTimeList.length > 0) {
				request(`/spent-times?${spentTimeList.map((id) => 'id=' + id).join('&')}`).then(
					(spentTimes) => {
						if (spentTimes.error) {
							pushSnackbarMessage.errorServerApi(spentTimes.error);
							dispatch(setSpentTimeListLoading(false));
							return;
						}
						const currentSpentTimeList =
							spentTimes.data as DataBaseSpentTimeWhithPaginationData;
						if (currentSpentTimeList?.content) {
							setSpentTimeList(currentSpentTimeList.content);
						}
						dispatch(setSpentTimeListLoading(false));
					},
				);
			}
		});
	}, [dispatch, params, updateData]);

	const onUpdateSpentTime = (newSpentTime?: DataBaseSpentTimeData) => {
		if (newSpentTime === undefined) {
			setUpdateData(!updateData);
			return
		}
		if (spentTimeList === null) {
			setSpentTimeList([newSpentTime]);
			return;
		}
		if (
			spentTimeList.filter((spentTime) => spentTime.id === newSpentTime.id).length === 0
		) {
			setUpdateData(!updateData);
		}
		const newSpentTimeList = spentTimeList.map((spentTime) => {
			return spentTime.id === newSpentTime.id ? newSpentTime : spentTime;
		});

		setSpentTimeList([...newSpentTimeList]);
	};

	const handelOnUpdateTask = (newTask: DataBaseTaskData|null) => {
			if (newTask===null) {
				return
			}
			setTask(newTask)
		}

	return (
		<div className={className}>
			{task !== null && (
				<>
					<TaskTitle task={task} onUpdate={handelOnUpdateTask} />
					{
						<SpentTimeList
							spentTimeList={spentTimeList}
							onUpdateSpentTime={onUpdateSpentTime}
						/>
					}
					{/* <Pagination /> */}
				</>
			)}
		</div>
	);
};

export const ViewTask = styled(ViewTaskContainer)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
