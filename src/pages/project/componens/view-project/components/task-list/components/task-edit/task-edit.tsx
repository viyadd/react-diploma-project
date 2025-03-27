import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, InfoBox, Input, Select } from '@/components';
import { AppComponentsPropsBase, DataBaseTaskData } from '@/types';
import {
	formatDate,
	getUserFullName,
	request,
	RequestParams,
	serverErrorToString,
	transformStatesToOptionList,
} from '@/utils';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '@/hooks/use-app-store';
import {
	selectIsStatusListLoading,
	selectIsTaskListLoading,
} from '@/selectors';
import { setTaskListLoading } from '@/actions';
import { useParams } from 'react-router-dom';
import { useStatusList } from '@/hooks';

interface TaskEditProps extends AppComponentsPropsBase {
	projectCode: string;
	item: DataBaseTaskData | null;
	onUpdateTask: (task: DataBaseTaskData) => void;
	onClose: () => void;
}

const taskFormSchema = yup.object().shape({
	codeName: yup.string().required('Заполните заголовок'),
	title: yup.string().required('Заполните заголовок'),
	description: yup.string().required('Заполните описание'),
	expectedSpentTime: yup.number().required('Заполните ожидаемое время выполнения'),
	state: yup.string().required('Заполните статус'),
});

const getFormValue = (item: DataBaseTaskData | null, projectCode: string) => {
	return {
		codeName: typeof item?.codeName === 'string' ? item?.codeName : projectCode + '-',
		title: typeof item?.title === 'string' ? item?.title : '',
		expectedSpentTime:
			typeof item?.expectedSpentTime === 'number' ? item?.expectedSpentTime : 20,
		description: typeof item?.description === 'string' ? item?.description : '',
		state: typeof item?.state?.id === 'string' ? item.state.id : '',
	};
};

const TaskEditContainer = ({
	className,
	projectCode,
	item,
	onUpdateTask,
	onClose,
}: TaskEditProps) => {
	const [serverError, setServerError] = useState<string | null>(null);

	// const statusListOls = useAppSelector(selectStatusList);
	const isStatusListLoading = useAppSelector(selectIsStatusListLoading);
	const isTaskListLoading = useAppSelector(selectIsTaskListLoading);

	const params = useParams();

	const dispatch = useAppDispatch();
	const statusList = useStatusList()

	const {
		register,
		reset,
		// watch,
		getValues,
		handleSubmit,
		formState: { isDirty, errors },
	} = useForm({
		values: getFormValue(item, projectCode),
		resolver: yupResolver(taskFormSchema),
	});

	const formError =
		errors?.codeName?.message ||
		errors?.title?.message ||
		errors?.expectedSpentTime?.message ||
		errors?.description?.message ||
		errors?.state?.message;
	const errorMessage = serverError || formError;

	const saveTask = () => {
		const requestParams: RequestParams = {
			url: item !== null ? `/tasks/${item.id}` : `/projects/${params.id}/tasks`,
			method: item !== null ? 'PATCH' : 'POST',
			data: getValues(),
		};

		dispatch(setTaskListLoading(true));

		const { url, method, data } = requestParams;
		request(url, method, data).then((savedTask) => {
			if (savedTask.error) {
				setServerError(serverErrorToString(savedTask.error));
				dispatch(setTaskListLoading(false));
				return;
			} else {
				onUpdateTask(savedTask.data as DataBaseTaskData);
			}

			dispatch(setTaskListLoading(false));
			onClose();
			reset();
		});
	};

	const onSubmit = () => {
		saveTask();
	};

	return (
		<div className={className}>
			{[
				['Дата создания', item !== null ? formatDate(item.createdAt, 'datetime') : '-'],
				['Владелец', getUserFullName({ user: item?.owner, isFill: true })],
				['Исполнитель', getUserFullName({ user: item?.executor, isFill: true })],
			].map(([label, value], i) => (
				<InfoBox key={i} label={label}>
					<div className="value"> {value} </div>
				</InfoBox>
			))}
			<Input
				type="text"
				placeholder="Код"
				{...register('codeName', {
					onChange: () => setServerError(null),
				})}
			/>
			<Input
				type="text"
				placeholder="Название"
				{...register('title', {
					onChange: () => setServerError(null),
				})}
			/>
			<Input
				type="text"
				placeholder="Описание"
				{...register('description', {
					onChange: () => setServerError(null),
				})}
			/>
			<Input
				type="number"
				placeholder="Ожидаемое время выполнения"
				{...register('expectedSpentTime', {
					onChange: () => setServerError(null),
				})}
			/>
			<Select
				placeholder="Статус"
				optionsList={transformStatesToOptionList(statusList.statusList || [])}
				loading={isStatusListLoading}
				{...register('state', {
					onChange: () => setServerError(null),
				})}
			/>
			<div className="error">{errorMessage}</div>
			<div className="buttons">
				<Button onClick={() => onClose()} width="45%" disabled={isTaskListLoading}>
					Отменить
				</Button>
				<Button
					onClick={handleSubmit(onSubmit)}
					disabled={!!formError || !isDirty || isTaskListLoading}
					width="45%"
				>
					Сохранить
				</Button>
			</div>
		</div>
	);
};

export const TaskEdit = styled(TaskEditContainer)`
	display: flex;
	flex-direction: column;
	gap: 13px;

	& .group {
		box-sizing: border-box;
		border: 1px solid #ddd;
		padding: 3px 6px;
	}

	& .value {
		text-align: left;
		padding: 6px 9px;
	}

	& .buttons {
		display: flex;
	}

	& .error {
		font-size: 16px;
		color: #e73131;
		height: 30px;
	}
`;
