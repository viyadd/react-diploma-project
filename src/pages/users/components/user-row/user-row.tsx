import { ChangeEventHandler, useEffect, useState } from 'react';
import { IconButton } from '../../../../components';
import { TableRow } from '../table-row/table-row';
import styled from 'styled-components';
import { request } from '../../../../utils';
import { AppComponentsPropsBase } from '../../../../types';

interface UsersTableRow extends AppComponentsPropsBase {
	id: string;
	login: string;
	registredAt: string;
	roleId: string;
	roles: Record<string, string>[];
	onUserRemove: () => void;
}
const UserRowContainer = ({
	className,
	id,
	login,
	registredAt,
	roleId: userRoleId,
	roles,
	onUserRemove,
}: UsersTableRow) => {
	const [initialRoleId, setInitialRoleId] = useState<string | undefined>(userRoleId);
	const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);

	useEffect(() => {
		setSelectedRoleId(userRoleId);
	}, [userRoleId]);

	const onRoleChange: ChangeEventHandler<HTMLSelectElement> = ({ target }) => {
		setSelectedRoleId(target.value);
	};

	const isSaveButtonDisabled = selectedRoleId === initialRoleId;

	const onRoleSave = (userId: string, newUserRoleId: string | null) => {
		if (newUserRoleId) {
			request(`/users/${userId}`, 'PATCH', { roleId: newUserRoleId })
			.then(() => {
				setInitialRoleId(newUserRoleId);
			});
		}
	};

	return (
		<div className={className}>
			<TableRow border={true}>
				<div className="login-column">{login}</div>
				<div className="registred-at-column">{registredAt}</div>
				<div className="role-column">
					<select value={`${selectedRoleId}`} onChange={onRoleChange}>
						{roles.map(({ id: roleId, name: roleName }) => (
							<option key={roleId} value={roleId}>
								{roleName}
							</option>
						))}
					</select>
					<IconButton
						id="fa-pencil"
						margin="0 0 0 10px"
						disabled={isSaveButtonDisabled}
						onClick={() => onRoleSave(id, selectedRoleId)}
					/>
					<IconButton id="fa-trash-o" onClick={onUserRemove} />
				</div>
			</TableRow>
		</div>
	);
};

export const UserRow = styled(UserRowContainer)`
	display: flex;
	margin-top: 10px;

	& select {
		padding: 0 5px;
		font-size: 16px;
		border: 1px solid #eebf7c;
		background-color: #fff;
	}
`;
