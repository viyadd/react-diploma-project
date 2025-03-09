import { Error } from '../error/error';
import { useEffect, useState } from 'react';
import {  useUserRights } from '../../hooks/use-user-rights';
import { AppUserRole } from '../../constants';
import { AppComponentsProps } from '../../types';
import { ERROR } from '../../constants/error';

interface PrivateContentProps extends AppComponentsProps {
	access: AppUserRole[];
	serverError: string | null;
}

export const PrivateContent = ({
	children,
	access,
	serverError = null,
}: PrivateContentProps) => {
	const [error, setError] = useState<string | null>(null);
	const userRights = useUserRights()

	useEffect(() => {
		userRights.asyncUpdateAccessRight(access)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [access]);

	useEffect(() => {
		const accessError = userRights.isAccessDenied ? null : ERROR.ACCESS_DENIED;
		setError(serverError || accessError);
	}, [userRights.isAccessDenied, serverError]);

	return userRights.isAccessDenied ? <Error error={error} /> : children;
};
