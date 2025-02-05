import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthFormError, Button, Input, PageTitle } from '../../components';
import { AppComponentsPropsBase } from '../../shared/interfaces';
import styled from 'styled-components';
import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { server } from '../../bff';
import { selectUserAccessRole } from '../../selectors';
import { setAccessRole, setUser } from '../../actions';
import { AppRole } from '../../bff/constants';
import { useAppDispatch, useAppSelector } from '../../hooks/use-app-store';

const authFormSchema = yup.object().shape({
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
});

const StyledLink = styled(Link)`
	text-align: center;
	text-decoration: underline;
	margin: 20px 0;
	font-size: 18px;
`;

const AuthorizationContainer = ({ className }: AppComponentsPropsBase) => {
	const {
		register,
		// reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});

	const [serverError, setServerError] = useState<string | null>(null);

	const dispatch = useAppDispatch();

	const userAccessRole = useAppSelector(selectUserAccessRole);

	// useResetForm(reset);

	const onSubmit = ({ login, password }: { login: string; password: string }) => {
		server.authorize(login, password).then(({ error, data }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}
			if (data !== null) {
				dispatch(setUser(data));
				dispatch(setAccessRole(data));
				sessionStorage.setItem('userData', JSON.stringify(data));
			}
		});
	};

	const formError = errors?.login?.message || errors?.password?.message;
	const errorMessage = formError || serverError;

	if (userAccessRole !== AppRole.Guest) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<PageTitle>Авторизация</PageTitle>
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
				<Button type="submit" disabled={!!formError}>
					Авторизоваться
				</Button>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
				<StyledLink to="/register">Регистрация</StyledLink>
			</form>
		</div>
	);
};

export const Authorization = styled(AuthorizationContainer)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	& > form {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 260px;
	}
`;
