import { Error } from '../error/error';
import { useEffect, useState } from 'react';
import { useUserRights } from '../../hooks/use-user-rights';
import { AppUserRole } from '../../constants';
import { AppComponentsProps } from '../../types';
import { ERROR } from '../../constants/error';
import { useAppSelector } from '@/hooks/use-app-store';
import { selectIsAccessRightLoading } from '@/selectors';
import { Loader } from './components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface PrivateContentProps extends AppComponentsProps {
	access: AppUserRole[];
	serverError?: string | null;
}

export const PrivateContentContainer = ({
	className,
	children,
	access,
	serverError = null,
}: PrivateContentProps) => {
	const [error, setError] = useState<string | null>(null);
	const isAccessRightLoading = useAppSelector(selectIsAccessRightLoading);
	const userRights = useUserRights();

	useEffect(() => {
		userRights.asyncUpdateAccessRight(access);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [access]);

	useEffect(() => {
		const accessError = userRights.isAccessDenied ? ERROR.ACCESS_DENIED : null;
		setError(serverError || accessError);
	}, [userRights.isAccessDenied, serverError]);

	return (
		<>
			{isAccessRightLoading && (
				<div className={className}>
					<Loader />
				</div>
			)}
			{userRights.isAccessDenied
				? error && (
						<div className={className}>
							<Error error={error} />
							<Link to='/info'>Дополнительная информация</Link>
						</div>
				  )
				: children}
		</>
	);
};

export const PrivateContent = styled(PrivateContentContainer)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	& a {
		text-decoration: none;
	}
`;
