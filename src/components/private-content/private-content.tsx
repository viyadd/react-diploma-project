import { Error } from '../error/error';
import { selectUserRole } from '../../selectors';
import { checkAccess } from '../../utils/check-access';
import { useAppSelector } from '../../hooks/use-app-store';
import { ERROR } from '../../shared/model';
import { AppComponentsProps } from '../../shared/interfaces';
import { AppRole } from '../../bff/constants';

interface PrivateContentProps extends AppComponentsProps {
	access: AppRole[];
	serverError: string | null;
}

export const PrivateContent = ({
	children,
	access,
	serverError = null,
}: PrivateContentProps) => {
	const userRole = useAppSelector(selectUserRole);

	const accessError = checkAccess(access, userRole) ? null : ERROR.ACCESS_DENIED;

	const error = serverError || accessError;

	return error ? <Error error={error} /> : children;
};
