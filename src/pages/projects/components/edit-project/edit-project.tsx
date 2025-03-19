import { AppComponentsPropsBase, DataBaseProjectData } from '@/types';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/use-app-store';
import {
	selectIsProjectListLoading,
	selectIsStatusListLoading,
	selectStatusList,
} from '@/selectors';
import { loadStatusListAsync } from '@/actions/load-status-list-async';
import { FormElementsCommon, InfoBox, Input, Select } from '@/components';
import { formatDate, getUserFullName, pushSnackbarMessage, request, RequestMethods, transformStatesToOptionList } from '@/utils';
import { setProjectListLoading } from '@/actions';

const projectFormSchema = yup.object().shape({
	title: yup.string().required('Заполните заголовок'),
	description: yup.string().required('Заполните описание'),
	state: yup.string().required('Заполните статус'),
});

const getFormValue = (item: DataBaseProjectData | null) => {
	return {
		title: typeof item?.title === 'string' ? item?.title : '',
		description: typeof item?.description === 'string' ? item?.description : '',
		state: typeof item?.state?.id === 'string' ? item.state.id : '',
	};
};

interface EditProjectProp extends AppComponentsPropsBase {
	item: DataBaseProjectData | null;
	onUpdate: (project: DataBaseProjectData) => void;
	onClose: () => void;
}

const EditProjectContainer = ({
	className,
	item,
	onUpdate,
	onClose,
}: EditProjectProp) => {
	const [serverError, setServerError] = useState<string | null>(null);

	const statusList = useAppSelector(selectStatusList);
	const isStatusListLoading = useAppSelector(selectIsStatusListLoading);
	const isProjectListLoading = useAppSelector(selectIsProjectListLoading);

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
		resolver: yupResolver(projectFormSchema),
	});

	useEffect(() => {
		if (statusList === null) {
			dispatch(loadStatusListAsync());
		}
	}, [dispatch, statusList]);

	const formError =
		errors?.title?.message || errors?.description?.message || errors?.state?.message;
	const errorMessage = serverError || formError;

	const saveProject = () => {
		const requestParams: { url: string; method: RequestMethods; data: unknown } = {
			url: item !== null ? `/projects/${item.id}` : `/projects`,
			method: item !== null ? 'PATCH' : 'POST',
			data: getValues(),
		};

		dispatch(setProjectListLoading(true));

		const { url, method, data } = requestParams;
		request(url, method, data).then((savedProject) => {
			if (savedProject.error) {
				pushSnackbarMessage.errorServerApi(savedProject.error);
			} else {
				onUpdate(savedProject.data as DataBaseProjectData);
			}

			dispatch(setProjectListLoading(false));
			onClose();
			reset();
		});
	};
	const onSubmit = () => {
		saveProject();
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
			<Select
				optionsList={transformStatesToOptionList(statusList || [])}
				loading={isStatusListLoading}
				{...register('state', {
					onChange: () => setServerError(null),
				})}
			/>
			<FormElementsCommon
				error={errorMessage}
				disabledCancel={isProjectListLoading}
				disabledSubmit={!!formError || !isDirty || isProjectListLoading}
				onCancel={() => onClose()}
				onSubmit={handleSubmit(onSubmit)}
			/>
		</div>
	);
};

export const EditProject = styled(EditProjectContainer)`
	display: flex;
	flex-direction: column;
	gap: 13px;
`;
