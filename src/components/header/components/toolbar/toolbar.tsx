import { IconButton } from '../../../icon-button/icon-button';
import { Button } from '../../../button/button';
import { Link } from 'react-router-dom';
import { selectUserAccessRole, selectUserSession } from '../../../../selectors';
import { logout } from '../../../../actions';
import styled from 'styled-components';
import { selectUserLogin } from '../../../../selectors/select-user-login';
import { AppRole } from '../../../../bff/constants';
import { useAppDispatch, useAppSelector } from '../../../../hooks/use-app-store';
import { resetAccessRole } from '../../../../actions/reset-access-role';

const ToolbarContainer = ({ className }: { className?: string }) => {
	const userAccessRole = useAppSelector(selectUserAccessRole)
	const session = useAppSelector(selectUserSession);
	const login = useAppSelector(selectUserLogin);

	const dispatch = useAppDispatch();

	const onLogout = () => {
		dispatch(logout(session));
		sessionStorage.removeItem('userData');
		dispatch(resetAccessRole());

	};

	return (
		<div className={className}>
			<div className="buttons">
				<IconButton id="fa-plus" />
			</div>
			<div className="options">
				{userAccessRole === AppRole.Guest ? (
					<Button>
						<Link to="/login">Войти</Link>
					</Button>
				) : (
					<>
						<div>{login}</div>
						<IconButton id="fa-sign-out" onClick={onLogout} />
					</>
				)}
			</div>
		</div>
	);
};

export const Toolbar = styled(ToolbarContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 19px;

	& .buttons {
		display: flex;
		align-items: center;
	}

	& .options {
		display: flex;
		margin-right: 9px;
	}
`;
