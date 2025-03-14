import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { request } from '@/utils';
import {
	AppComponentsPropsBase,
	DataBaseSpentTimeData,
	DataBaseSpentTimeWhithPaginationData,
	DataBaseTaskData,
} from '@/types';
import { SpentTimeList, TaskTitle } from './components';
import { useAppDispatch } from '@/hooks/use-app-store';
import { SetSpentTimeListLoading, SetTaskLoading } from '@/actions';
// import { Pagination } from '../../../../components';

const ViewTaskContainer = ({ className }: AppComponentsPropsBase) => {
	const [task, setTask] = useState<DataBaseTaskData | null>(null);
	const [spentTimeList, setSpentTimeList] = useState<DataBaseSpentTimeData[] | null>(
		null,
	);

	const params = useParams();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(SetTaskLoading(true));
		dispatch(SetSpentTimeListLoading(true));
		const { id } = params;
		if (id === undefined) {
			dispatch(SetTaskLoading(false));
			dispatch(SetSpentTimeListLoading(false));
			return;
		}
		request(`/tasks/${id}`).then((loadedTask) => {
			console.log('loadedTask -->', { loadedProject: loadedTask });
			if (loadedTask.error) {
				console.log('не удалось загрузить задачу', loadedTask.error);
				// TODO вывести сообщение об ошибке
				dispatch(SetTaskLoading(false));
				dispatch(SetSpentTimeListLoading(false));
				return;
			}
			const currentTask = loadedTask.data as DataBaseTaskData;
			setTask(currentTask);
			dispatch(SetTaskLoading(false));

			const spentTimeList = currentTask.spentTimes;
			if (spentTimeList.length === 0) {
				dispatch(SetSpentTimeListLoading(false));
			}

			console.log('tasks >>', { t: currentTask, st: spentTimeList });
			if (spentTimeList.length > 0) {
				request(`/spent-times?${spentTimeList.map((id) => 'id=' + id).join('&')}`).then(
					(spentTimes) => {
						if (spentTimes.error) {
							console.log('не удалось загрузить задачи', spentTimes.error);
							// TODO вывести сообщение об ошибке
							dispatch(SetSpentTimeListLoading(false));
							return;
						}
						const currentSpentTimeList =
							spentTimes.data as DataBaseSpentTimeWhithPaginationData;
						if (currentSpentTimeList?.content) {
							setSpentTimeList(currentSpentTimeList.content);
						}
						dispatch(SetSpentTimeListLoading(false));
						console.log('currentSpentTimeList', currentSpentTimeList.content);
					},
				);
			}
		});
	}, [dispatch, params]);

	return (
		<div className={className}>
			{task !== null && (
				<>
					<TaskTitle task={task} />
					{<SpentTimeList spentTimeList={spentTimeList} />}
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
