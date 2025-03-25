import { AppComponentsPropsBase, DataBaseUserData } from '@/types';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/use-app-store';
import {
	selectIsRoleListLoading,
	selectIsUserListLoading,
	selectRoleList,
} from '@/selectors';
import { FormElementsCommon, InfoBox, Input, Select } from '@/components';
import {
	formatDate,
	pushSnackbarMessage,
	request,
	RequestMethods,
	transformRolesToOptionList,
} from '@/utils';
import { loadRoleListAsync, setUserListLoading } from '@/actions';

const projectFormSchema = yup.object().shape({
	name: yup.string().required('Заполните имя'),
	surname: yup.string().required('Заполните фамилию'),
	patronymic: yup.string(),
	roleId: yup.number().required('Укажите роль'),
});

const getFormValue = (item: DataBaseUserData | null) => {
	return {
		name: typeof item?.name === 'string' ? item?.name : '',
		surname: typeof item?.surname === 'string' ? item?.surname : '',
		patronymic: typeof item?.patronymic === 'string' ? item?.patronymic : '',
		roleId: typeof item?.roleId === 'number' ? item.roleId : -1,
	};
};

interface EditUserProp extends AppComponentsPropsBase {
	item: DataBaseUserData | null;
	onUpdate: (user: DataBaseUserData) => void;
	onClose: () => void;
}

const EditUserContainer = ({ className, item, onUpdate, onClose }: EditUserProp) => {
	const [serverError, setServerError] = useState<string | null>(null);

	const roleList = useAppSelector(selectRoleList);
	const isRoleListLoading = useAppSelector(selectIsRoleListLoading);
	const isUserListLoading = useAppSelector(selectIsUserListLoading);

	const dispatch = useAppDispatch();

	const {
		register,
		reset,
		// watch,
		getValues,
		handleSubmit,
		formState: { isDirty, errors },
	} = useForm({
		values: getFormValue(item),
		resolver: yupResolver(projectFormSchema),
	});

	useEffect(() => {
		if (roleList === null) {
			dispatch(loadRoleListAsync());
		}
	}, [dispatch, roleList]);

	const formError =
		errors?.name?.message || errors?.surname?.message || errors?.roleId?.message;
	const errorMessage = serverError || formError;

	const saveUser = () => {
		const requestParams: { url: string; method: RequestMethods; data: unknown } = {
			url: item !== null ? `/users/${item.id}` : `/users`,
			method: item !== null ? 'PATCH' : 'POST',
			data: getValues(),
		};

		dispatch(setUserListLoading(true));

		const { url, method, data } = requestParams;
		request(url, method, data).then((savedUser) => {
			if (savedUser.error) {
				pushSnackbarMessage.errorServerApi(savedUser.error);
			} else {
				onUpdate(savedUser.data as DataBaseUserData);
			}

			dispatch(setUserListLoading(false));
			onClose();
			reset();
		});
	};
	const onSubmit = () => {
		saveUser();
	};

	return (
		<div className={className}>
			{[
				[
					'Дата регистрации',
					item !== null ? formatDate(item.registredAt, 'datetime') : '-',
				],
				// ['Владелец', getUserFullName({ user: item?.owner, isFill: true })],
				// ['Исполнитель', getUserFullName({ user: item?.executor, isFill: true })],
			].map(([label, value], i) => (
				<InfoBox key={i} label={label}>
					<div className="value"> {value} </div>
				</InfoBox>
			))}
			<Input
				type="text"
				placeholder="Фамилия"
				{...register('surname', {
					onChange: () => setServerError(null),
				})}
			/>
			<Input
				type="text"
				placeholder="Имя"
				{...register('name', {
					onChange: () => setServerError(null),
				})}
			/>
			<Input
				type="text"
				placeholder="Отчество"
				{...register('patronymic', {
					onChange: () => setServerError(null),
				})}
			/>
			<Select
				placeholder="Роль"
				optionsList={transformRolesToOptionList(roleList || [])}
				loading={isRoleListLoading}
				{...register('roleId', {
					onChange: () => setServerError(null),
				})}
			/>
			<FormElementsCommon
				error={errorMessage}
				disabledCancel={isUserListLoading}
				disabledSubmit={!!formError || !isDirty || isUserListLoading}
				onCancel={() => onClose()}
				onSubmit={handleSubmit(onSubmit)}
			/>
		</div>
	);
};

export const EditUser = styled(EditUserContainer)`
	display: flex;
	flex-direction: column;
	gap: 13px;
`;
