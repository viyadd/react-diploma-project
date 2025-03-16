import { Button, InfoBox, Input } from '@/components';
import { AppComponentsPropsBase, DataBaseSpentTimeData } from '@/types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
	formatDate,
	getUserFullName,
	pushServerApiSnackbarMessage,
	request,
	RequestMethods,
} from '@/utils';
import styled from 'styled-components';
import { useState } from 'react';
import { useAppDispatch } from '@/hooks/use-app-store';
import { useParams } from 'react-router-dom';
import { SetSpentTimeListLoading } from '@/actions';

const spentFormSchema = yup.object().shape({
	comment: yup.string().required('Заполните комментарий'),
	duration: yup.number().typeError('Продолжительность должна быть числом в минутах')
	.positive('Продолжительность должна быть положительным числом')
	.required('Заполните продолжительность'),
	date: yup.string().required('Заполните дату начала работы'),
	time: yup.string().required('Заполните время начала'),
});

interface EditSpentTimeProps extends AppComponentsPropsBase {
	item: DataBaseSpentTimeData | null;
	onUpdate: (task: DataBaseSpentTimeData) => void;
	onClose: () => void;
}

const getFormValue = (item: DataBaseSpentTimeData | null) => {
	return {
		comment: typeof item?.comment === 'string' ? item?.comment : '',
		duration: typeof item?.duration === 'number' ? item?.duration : 0,
		date:
			typeof item?.startedAt === 'string'
				? formatDate(item?.startedAt, 'dateYMD')
				: formatDate(new Date().toISOString(), 'dateYMD'),
		time: typeof item?.startedAt === 'string' ? formatDate(item?.startedAt, 'time') : '',
	};
};

const EditSpentTimeContainer = ({
	className,
	item,
	onClose,
	onUpdate,
}: EditSpentTimeProps) => {
	const [serverError, setServerError] = useState<string | null>(null);
	// const [editItem, setEditItem] = useState<DataBaseSpentTimeData | null>(null);

	const params = useParams();
	const dispatch = useAppDispatch();

	const {
		register,
		reset,
		getValues,
		handleSubmit,
		formState: { isDirty, errors },
	} = useForm({
		values: getFormValue(item),
		resolver: yupResolver(spentFormSchema),
	});

	const formError =
		errors?.comment?.message ||
		errors?.duration?.message ||
		errors?.date?.message ||
		errors?.time?.message;
	const errorMessage = serverError || formError;

	const parsingFormData = ({ date, time, ...etc }: { date: string; time: string }) => {
		return { ...etc, startedAt: new Date(`${date}T${time}:00.000Z`) };
	};

	const onSubmit = () => {
		const formData = getValues();

		const requestParams: { url: string; method: RequestMethods; data: unknown } = {
			url: item !== null ? `/spent-times/${item.id}` : `/tasks/${params.id}/spent-time`,
			method: item !== null ? 'PATCH' : 'POST',
			data: { ...parsingFormData(formData) },
		};

		dispatch(SetSpentTimeListLoading(true));

		const { url, method, data } = requestParams;
		request(url, method, data).then((savedSpendTime) => {
			if (savedSpendTime.error) {
				pushServerApiSnackbarMessage({ error: savedSpendTime.error });

				dispatch(SetSpentTimeListLoading(false));
				return;
			} else {
				onUpdate(savedSpendTime.data as DataBaseSpentTimeData);
			}

			dispatch(SetSpentTimeListLoading(false));
			onClose();
			reset();
		});
	};

	return (
		<div className={className}>
			{[['Исполнитель', getUserFullName({ user: item?.executor, isFill: true })]].map(
				([label, value], i) => (
					<InfoBox key={i} label={label}>
						<div className="value"> {value} </div>
					</InfoBox>
				),
			)}
			<Input
				type="text"
				placeholder="Комментарий"
				{...register('comment', {
					onChange: () => setServerError(null),
				})}
			/>
			<Input
				type="date"
				placeholder="Описание"
				{...register('date', {
					onChange: () => setServerError(null),
				})}
			/>
			<Input
				type="time"
				placeholder="state"
				{...register('time', {
					onChange: () => setServerError(null),
				})}
			/>
			<Input
				type="text"
				placeholder="Продолжительность"
				{...register('duration', {
					onChange: () => setServerError(null),
				})}
			/>
			<div className="error">{errorMessage}</div>
			<div className="buttons">
				<Button onClick={() => onClose()} width="45%">
					Отменить
				</Button>
				<Button
					onClick={handleSubmit(onSubmit)}
					disabled={!!formError || !isDirty}
					width="45%"
				>
					Сохранить
				</Button>
			</div>
		</div>
	);
};

export const EditSpentTime = styled(EditSpentTimeContainer)`
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
	& .error {
		font-size: 16px;
		color: #e73131;
		min-height: 30px;
	}
`;
