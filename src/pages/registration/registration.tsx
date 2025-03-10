import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormError, Input, Button, PageTitle } from '../../components';
import { useResetForm } from '../../hooks';
import styled from 'styled-components';
import { request } from '../../utils';
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
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			passcheck: '',
		},
		resolver: yupResolver(regFormSchema),
	});

	const [serverError, setServerError] = useState<string | null>(null);

	// const dispatch = useAppDispatch();
	const usersRights = useUserRights()

	useResetForm(reset);

	// const userAccessRole = useAppSelector(selectUserAccessRole)

	const onSubmit = ({ login, password }: { login: string; password: string }) => {
		request('/register', 'POST', {login, password}).then(({ error, data }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}
			if (data !== null) {
				usersRights.updateAccessRight(data as DataBaseUserData, accessRoles)
				// dispatch(setUser(data));
				// dispatch(setAccessRole(data))
				// sessionStorage.setItem('userData', JSON.stringify(data));
			}
		});
	};

	const formError =
		errors?.login?.message || errors?.password?.message || errors?.passcheck?.message;
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
