import { IconButton } from '../../../icon-button/icon-button';
import { Button } from '../../../button/button';
import { Link } from 'react-router-dom';
import {
	selectAppUserIdentified,
	selectToolbarOptions,
} from '../../../../selectors';
import styled from 'styled-components';
import { selectUserLogin } from '../../../../selectors/select-user-login';
import { useAppSelector } from '../../../../hooks/use-app-store';
import { useUserRights } from '../../../../hooks/use-user-rights';

const ToolbarContainer = ({ className }: { className?: string }) => {
	const login = useAppSelector(selectUserLogin);
	const toolbarOptions = useAppSelector(selectToolbarOptions);
	const isIdentifiedUser = useAppSelector(selectAppUserIdentified)

	const usersRights = useUserRights()

	const onLogout = () => {
		usersRights.logout()
	};

	return (
		<div className={className}>
			<div className="buttons">
				{toolbarOptions &&
					isIdentifiedUser &&
					toolbarOptions
						// .filter((w) => w.accessRoleList.includes(userAccessRole))
						.map(({ key, iconId, tooltip, onClick}) => {
							return <IconButton key={key} id={iconId} tooltip={tooltip} onClick={onClick} />;
						})}
			</div>
			<div className="options">
				{!isIdentifiedUser ? (
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
