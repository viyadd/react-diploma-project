import styled from 'styled-components';
import { PageTitle } from '../../components';
import { useEffect, useState } from 'react';
import { server } from '../../bff';
import { TableRow } from './components';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors';
import { useServerAuthorization } from '../../hooks';
import { checkAccess } from '../../utils';
import { AppRole } from '../../bff/constants';
import { UserRow } from './components/user-row/user-row';
import { transformDBFieldToAppRoleId } from '../../bff/transformers';

const UsersContainer = ({ className }: { className?: string }) => {
	const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);


	const userRole = useSelector(selectUserRole);
	const serverAuth = useServerAuthorization();

	useEffect(() => {
    if (!checkAccess([AppRole.Admin], userRole)) {
      return;
    }

    Promise.all([server.fetchUsers(serverAuth()), server.fetchRoles(serverAuth())]).then(
      ([usersRes, rolesRes]) => {
        if (usersRes.error || rolesRes.error) {
          setErrorMessage(usersRes.error || rolesRes.error);
          return;
        }

        setUsers(usersRes.data);
        setRoles(rolesRes.data);
      },
    );
  }, [serverAuth, userRole, shouldUpdateUserList]);

	const onUserRemove = (userId: string) => {
		if (!checkAccess([AppRole.Admin], userRole)) {
			return;
    }

    server.removeUser(serverAuth(),userId).then(() => {
      setShouldUpdateUserList(!shouldUpdateUserList);
    });
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
              roles={roles.filter(({ id: roleId }) => transformDBFieldToAppRoleId(roleId) !== AppRole.Guest)}
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
