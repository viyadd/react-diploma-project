import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormError, Input, Button, PageTitle } from '../../components';
import { useResetForm } from '../../hooks';
import styled from 'styled-components';
import { pushSnackbarMessage, request } from '../../utils';
import { useUserRights } from '../../hooks/use-user-rights';
import { AppUserRole } from '../../constants';
import { AppComponentsPropsBase, DataBaseUserData } from '../../types';

const regFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните логин')
		.matches(/^\w+$/, 'Неверно заполнен  логин. Допускается только буквы и цифры')
		.min(3, 'Неверно заполнен  логин. Минимум 3 символа')
		.max(15, 'Неверно заполнен  логин. Максимум 15 символов'),
	name: yup.string().required('Заполните имя'),
	surname: yup.string().required('Заполните имя'),
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(/^[\w#%]+$/, 'Неверно заполнен пароль. Допускаются буквы, цифры и знаки # %')
		.min(6, 'Неверно заполнен  пароль. Минимум 6 символа')
		.max(30, 'Неверно заполнен  пароль. Максимум 30 символов'),
	passcheck: yup
		.string()
		.required('Заполните повтор пароля')
		.oneOf([yup.ref('password'), null], 'Повтор пароля не совпадает'),
});

const accessRoles = [AppUserRole.Admin, AppUserRole.User, AppUserRole.Guest];

const RegistrationContainer = ({ className }: AppComponentsPropsBase) => {
	const {
		register,
		reset,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			name: '',
			surname: '',
			password: '',
			passcheck: '',
		},
		resolver: yupResolver(regFormSchema),
	});

	const [serverError, setServerError] = useState<string | null>(null);

	const navigate = useNavigate()
	const usersRights = useUserRights();

	useResetForm(reset);

	// const userAccessRole = useAppSelector(selectUserAccessRole)

	const onSubmit = () => {
		const { login, name, surname, password } = getValues();
		request('/register', 'POST', { login, name, surname, password }).then(
			({ error, data }) => {
				if (error) {
					setServerError(`Ошибка запроса: ${error}`);
					return;
				}
				if (data !== null) {
					usersRights.updateAccessRight(data as DataBaseUserData, accessRoles);
					pushSnackbarMessage.success('Пользователь успешно зарегистрирован.')
					navigate(`/`);
				}
			},
		);
	};

	const formError =
		errors?.login?.message ||
		errors?.name?.message ||
		errors?.surname?.message ||
		errors?.password?.message ||
		errors?.passcheck?.message;
	const errorMessage = formError || serverError;

	if (!usersRights.isUserGuest()) {
		return <Navigate to="/" />;
	}
	return (
		<div className={className}>
			<PageTitle>Регистрация</PageTitle>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Логин..."
					{...register('login', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="text"
					placeholder="Имя..."
					{...register('name', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="text"
					placeholder="Фамилия..."
					{...register('surname', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="password"
					placeholder="Пароль..."
					{...register('password', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="password"
					placeholder="Проверка пароля..."
					{...register('passcheck', {
						onChange: () => setServerError(null),
					})}
				/>
				<Button type="submit" disabled={!!formError}>
					Зарегистрироваться
				</Button>
				{errorMessage && <FormError>{errorMessage}</FormError>}
			</form>
		</div>
	);
};

export const Registration = styled(RegistrationContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;

	& > form {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 260px;
	}
`;
