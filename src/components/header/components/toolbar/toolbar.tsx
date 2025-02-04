import { IconButton } from '../../../icon-button/icon-button';
import { Button } from '../../../button/button';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserRole, SelectUserSession } from '../../../../selectors';
import { ROLE } from '../../../../constants';
import { logout } from '../../../../actions';
import styled from 'styled-components';
import { selectUserLogin } from '../../../../selectors/select-user-login';

const ToolbarContainer = ({ className }: { className?: string }) => {
	const roleId = useSelector(selectUserRole);
	const session = useSelector(SelectUserSession);
	const login = useSelector(selectUserLogin);

	const dispatch = useDispatch();

	const onLogout = () => {
		dispatch(logout(session));
		sessionStorage.removeItem('userData');
	};

	return (
		<div className={className}>
			<div className="buttons">
				<IconButton id="fa-plus" />
			</div>
			<div className="options">
				{roleId === ROLE.GUEST ? (
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
