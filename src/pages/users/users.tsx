import styled from 'styled-components';
import { DataTable, Dialog, PageTitle, PrivateContent } from '../../components';
import { useEffect, useState } from 'react';
// import { TableRow } from './components';
import { pushSnackbarMessage, request } from '../../utils';
// import { UserRow } from './components/user-row/user-row';
import { AppUserRole } from '../../constants';
import { useUserRights } from '../../hooks/use-user-rights';
import {
	DataBaseUserData,
	DataTableHeader,
	DataTableTool,
	DialogType,
	ToolbarOptions,
} from '@/types';
import { useAppDispatch, useAppSelector } from '@/hooks/use-app-store';
import { selectIsUserListLoading, selectUserId } from '@/selectors';
import { setToolbarOptionList, setUserListLoading } from '@/actions';
import { EditUser, ViewUser } from './components';

type DialogUserMode = 'info' | 'edit' | 'new';
const editFormsModList: (DialogUserMode | null)[] = ['edit', 'new'];

const accessRoles = [AppUserRole.Admin];

const headerList: DataTableHeader[] = [
	{
		key: 'login',
		text: 'Логин',
		// link: (v: unknown) => `/project/${(v as DataBaseProjectData)?.id}`,
	},
	{ key: 'registredAt', text: 'Дата регистрации', type: 'datetime' },
	{ key: 'roleId', text: 'Роль' },
	{ key: 'name', text: 'Имя' },
	// { key: 'startedAt', text: 'Дата начала', type: 'datetime' },
	// { key: 'endedAt', text: 'Дата завершения', type: 'datetime' },
];

const UsersContainer = ({ className }: { className?: string }) => {
	const [userList, setUserList] = useState<DataBaseUserData[] | []>([]);
	const [currentUser, setCurrentUser] = useState<DataBaseUserData | null>(null);
	const [dataTableTools, setDataTableTools] = useState<DataTableTool[] | null>(null);
	const [toolbarOptions, setToolbarOptions] = useState<ToolbarOptions[] | null>(null);
	const [dialogUserMode, setDialogUserMode] = useState<DialogUserMode | null>(null);
	const [isOpenUserDialog, setIsOpenUserDialog] = useState(false);
	const [isOpenYesNo, setIsOpenYesNo] = useState(false);
	const [updateData, setUpdateData] = useState(false);

	const isUserListLoading = useAppSelector(selectIsUserListLoading);
	const userId = useAppSelector(selectUserId);

	const dispatch = useAppDispatch();

	const usersRights = useUserRights();

	useEffect(() => {
		const tools: ToolbarOptions[] = [
			{
				key: 'add',
				iconId: 'fa-plus',
				accessRoleList: accessRoles,
				onClick: () => {
					// todo delete file
					// navigate(`/project`);
					setDialogUserMode('new');
					setIsOpenUserDialog(true);
				},
			},
		];
		if (toolbarOptions === null) {
			setToolbarOptions(tools);
			return;
		}
		dispatch(setToolbarOptionList(toolbarOptions));
	}, [dispatch, toolbarOptions]);

	useEffect(() => {
		setDataTableTools([
			{
				key: 'view',
				iconId: 'fa-eye',
				onClick: ({ value }) => {
					setCurrentUser(value as DataBaseUserData);
					setDialogUserMode('info');
					setIsOpenUserDialog(true);
				},
			},
			{
				key: 'edit',
				iconId: 'fa-pencil',
				onClick: ({ value }) => {
					setCurrentUser(value as DataBaseUserData);
					setDialogUserMode('edit');
					setIsOpenUserDialog(true);
				},
			},
			{
				key: 'delete',
				iconId: 'fa-trash-o',
				onClick: ({ value }) => {
					const user = value as DataBaseUserData;
					if (userId === user.id) {
						pushSnackbarMessage.error('Пользователь не может удалить сам себя');
						return;
					}
					setCurrentUser(user);
					setIsOpenYesNo(true);
				},
			},
		]);
	}, []);

	useEffect(() => {
		if (!usersRights.isAccessGranted(accessRoles)) {
			return;
		}
		dispatch(setUserListLoading(true));
		request('/users').then((usersData) => {
			if (usersData.error) {
				pushSnackbarMessage.errorServerApi(usersData.error);
				dispatch(setUserListLoading(false));
				return;
			}

			if (usersData.data !== null) {
				setUserList(usersData.data as DataBaseUserData[]);
			}
			dispatch(setUserListLoading(false));
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, updateData]);

	const getDialogTitle = (mode: DialogUserMode | null) => {
		switch (mode) {
			case 'edit':
				return 'Редактировать данные пользователя';
			case 'new':
				return 'Добавить нового пользователя';
			case 'info':
				return 'Информация о пользователе';
			default:
				return '-';
		}
	};

	const handleUserDialogClose = () => {
		setIsOpenUserDialog(false);
	};

	const handleUserUpdate = (newUser: DataBaseUserData) => {
		if (userList === null) {
			setUserList([newUser]);
			return;
		}
		if (userList.filter((user) => user.id === newUser.id).length === 0) {
			setUpdateData(!updateData);
		}
		const newUserList = userList.map((user) => {
			return user.id === newUser.id ? newUser : user;
		});

		setUserList(newUserList);
	};

	const handleYesConfirmed = () => {
		setIsOpenYesNo(false);
		if (currentUser?.id === undefined) {
			return;
		}
		dispatch(setUserListLoading(true));

		request(`/users/${currentUser.id}`, 'DELETE').then((response) => {
			if (response.error) {
				pushSnackbarMessage.errorServerApi(response.error);
			}
			setUpdateData(!updateData);
		});
	};

	return (
		<PrivateContent access={accessRoles}>
			<div className={className}>
				<PageTitle>Список пользователей</PageTitle>
				<div className="content">
					<DataTable
						headers={headerList}
						items={userList}
						tools={dataTableTools}
						loading={isUserListLoading}
					/>
				</div>
				<Dialog
					open={isOpenYesNo}
					type={DialogType.YesNo}
					onClose={() => setIsOpenYesNo(false)}
					onConfirm={handleYesConfirmed}
				>
					Удалить пользователя?
				</Dialog>
				<Dialog
					type={dialogUserMode === 'info' ? DialogType.Info : undefined}
					open={isOpenUserDialog}
					title={getDialogTitle(dialogUserMode)}
					width="500px"
					onClose={handleUserDialogClose}
				>
					{dialogUserMode === 'info' && <ViewUser item={currentUser} />}
					{editFormsModList.includes(dialogUserMode) && (
						<EditUser
							item={currentUser}
							onUpdate={handleUserUpdate}
							onClose={handleUserDialogClose}
						/>
					)}
				</Dialog>
			</div>
		</PrivateContent>
	);
};

export const Users = styled(UsersContainer)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
