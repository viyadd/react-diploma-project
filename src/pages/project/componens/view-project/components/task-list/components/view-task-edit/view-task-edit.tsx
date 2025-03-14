import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, InfoBox, Input, Select } from '@/components';
import { AppComponentsPropsBase, DataBaseTaskData } from '@/types';
import {
	formatDate,
	getUserFullName,
	request,
	RequestMethods,
	transformAppStateToOptionList,
} from '@/utils';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '@/hooks/use-app-store';
import {
	selectIsStatusListLoading,
	selectIsTaskListLoading,
	selectStatusList,
} from '@/selectors';
import { loadStatusListAsync } from '@/actions/load-status-list-async';
import { SetApiError, SetTaskListLoading } from '@/actions';
import { useParams } from 'react-router-dom';

interface ViewTaskEditProps extends AppComponentsPropsBase {
	item: DataBaseTaskData | null;
	onUpdateTask: (task: DataBaseTaskData) => void;
	setShowMode: (isShowMode: boolean) => void;
}

const taskFormSchema = yup.object().shape({
	codeName: yup.string().required('Заполните заголовок'),
	title: yup.string().required('Заполните заголовок'),
	description: yup.string().required('Заполните описание'),
	state: yup.string().required('Заполните статус'),
});

const getFormValue = (item: DataBaseTaskData | null) => {
	return {
		codeName: typeof item?.codeName === 'string' ? item?.codeName : '',
		title: typeof item?.title === 'string' ? item?.title : '',
		description: typeof item?.description === 'string' ? item?.description : '',
		state: typeof item?.state?.id === 'string' ? item.state.id : '',
	};
};

const ViewTaskEditContainer = ({
	className,
	item,
	onUpdateTask,
	setShowMode,
}: ViewTaskEditProps) => {
	const [serverError, setServerError] = useState<string | null>(null);

	const statusList = useAppSelector(selectStatusList);
	const isStatusListLoading = useAppSelector(selectIsStatusListLoading);
	const isTaskListLoading = useAppSelector(selectIsTaskListLoading);

	const params = useParams();

	const dispatch = useAppDispatch();

	const {
		register,
		reset,
		// watch,
		getValues,
		handleSubmit,
		formState: { isDirty, errors }, // isDirty, dirtyFields,
	} = useForm({
		values: getFormValue(item),
		resolver: yupResolver(taskFormSchema),
	});

	useEffect(() => {
		if (statusList === null) {
			dispatch(loadStatusListAsync());
		}
		console.log('loadStatusListAsync >>', { statusList });
	}, [dispatch, statusList]);

	const formError =
		errors?.codeName?.message ||
		errors?.title?.message ||
		errors?.description?.message ||
		errors?.state?.message;
	const errorMessage = serverError || formError;

	const saveTask = () => {
		const requestParams: { url: string; method: RequestMethods; data: unknown } = {
			url: item !== null ? `/tasks/${item.id}` : `/projects/${params.id}/tasks`,
			method: item !== null ? 'PATCH' : 'POST',
			data: getValues(),
		};
		// console.log(item, requestParams, params)

		dispatch(SetTaskListLoading(true));

		const { url, method, data } = requestParams;
		request(url, method, data).then((savedTask) => {
			if (savedTask.error) {
				dispatch(SetApiError(savedTask.error));
			}
			onUpdateTask(savedTask.data as DataBaseTaskData);

			dispatch(SetTaskListLoading(false));
			setShowMode(false);
			reset();

			// console.log('click', savedTask);
		});
	};

	const onSubmit = () => {
		const v = getValues();
		console.log('onSubmit', v);
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
			{/* <Input
				type="text"
				placeholder="state"
				{...register('stateId', {
					onChange: () => setServerError(null),
				})}
			/> */}
			<Select
				optionsList={transformAppStateToOptionList(statusList || [])}
				loading={isStatusListLoading}
				{...register('state', {
					onChange: () => setServerError(null),
				})}
			/>
			<div className="error">{errorMessage}</div>
			<div className="buttons">
				<Button
					onClick={() => setShowMode(false)}
					width="45%"
					disabled={isTaskListLoading}
				>
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

export const ViewTaskEdit = styled(ViewTaskEditContainer)`
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
