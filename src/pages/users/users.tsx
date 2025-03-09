import styled from 'styled-components';
import { PageTitle } from '../../components';
import { useEffect, useState } from 'react';
import { TableRow } from './components';
import { request } from '../../utils';
import { UserRow } from './components/user-row/user-row';
import { AppUserRole } from '../../constants';
import { useUserRights } from '../../hooks/use-user-rights';

const accessRoles = [AppUserRole.Admin, AppUserRole.User];

const UsersContainer = ({ className }: { className?: string }) => {
	const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);


	// const userRole = useAppSelector(selectUserRole);
	// const serverAuth = useServerAuthorization();
const usersRights = useUserRights();

	useEffect(() => {
    if (!usersRights.isAccessGranted(accessRoles)) {
      return;
    }

    Promise.all([
			request('/users'),
			request('/users/roles'),
			// server.fetchUsers(serverAuth()),
			// server.fetchRoles(serverAuth())
		]).then(
      ([loadedUsers, loadedRoles]) => {
        if (loadedUsers.error || loadedRoles.error) {
          setErrorMessage(loadedUsers.error || loadedRoles.error);
          return;
        }

        setUsers(loadedUsers.data);
        setRoles(loadedRoles.data);
      },
    );
  }, [shouldUpdateUserList, usersRights]);

	const onUserRemove = (userId: string) => {
		if (!usersRights.isAccessGranted([AppUserRole.Admin])) {
			return;
    }
		// todoo удаление пользователя
		console.log('todoo -> удаление пользователя', userId)

    // server.removeUser(serverAuth(),userId).then(() => {
    //   setShouldUpdateUserList(!shouldUpdateUserList);
    // });
  };

	return (
		<div className={className}>
			<PageTitle>Список пользователей</PageTitle>
			<TableRow>
				<div className="login-column">Логин</div>
				<div className="registred-at-column">Дата регистрации</div>
				<div className="role-column">Роль</div>
			</TableRow>
			{users.map(({ id, login, registredAt, roleId }) => (
            <UserRow
              key={id}
              id={id}
              login={login}
              registredAt={registredAt}
              roleId={roleId}
              roles={roles.filter(({ id: roleId }) => transformDBFieldToAppRoleId(roleId) !== AppUserRole.Guest)}
              onUserRemove={() => onUserRemove(id)}
            />
          ))}
		</div>
	);
};

export const Users = styled(UsersContainer)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
