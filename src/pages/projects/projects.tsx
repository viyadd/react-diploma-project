import { DataTable, PageTitle, PrivateContent } from '@/components';
import { useEffect, useState } from 'react';
import { pushServerApiSnackbarMessage, request, serverErrorToString } from '@/utils';
import { useAppDispatch, useAppSelector } from '@/hooks/use-app-store';
import {
	AppComponentsPropsBase,
	DataBaseProjectData,
	DataTableHeader,
	DataTableTool,
	ToolbarOptions,
} from '@/types';
import { setProjectListLoading, setToolbarOptionList } from '@/actions';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AppUserRole } from '@/constants';
import { useUserRights } from '@/hooks/use-user-rights';
import { selectIsProjectListLoading } from '@/selectors';

const headerList: DataTableHeader[] = [
	{
		key: 'title',
		text: 'Название',
		link: (v: unknown) => `/project/${(v as DataBaseProjectData)?.id}`,
	},
	{ key: 'createdAt', text: 'Дата создания', type: 'datetime' },
	{ key: 'state.text', text: 'Статус' },
	{ key: 'description', text: 'Описание' },
	// { key: 'startedAt', text: 'Дата начала', type: 'datetime' },
	// { key: 'endedAt', text: 'Дата завершения', type: 'datetime' },
];

const accessRoles = [AppUserRole.Admin, AppUserRole.User];

const ProjectsContainer = ({ className }: AppComponentsPropsBase) => {
	const [dataTableTools, setDataTableTools] = useState<DataTableTool[] | null>(null);
	const [toolbarOptions, setToolbarOptions] = useState<ToolbarOptions[] | null>(null);
	const [projectList, setProjectList] = useState<DataBaseProjectData[] | []>([]);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const isProjectListLoading = useAppSelector(selectIsProjectListLoading);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const usersRights = useUserRights();

	const tools: ToolbarOptions[] = [
		{
			key: 'add',
			iconId: 'fa-plus',
			accessRoleList: accessRoles,
			onClick: () => {
				navigate(`/project`);
				setToolbarOptions([]);
			},
		},
	];

	useEffect(() => {
		if (toolbarOptions === null) {
			setToolbarOptions(tools);
			return;
		}
		dispatch(setToolbarOptionList(toolbarOptions));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, toolbarOptions]);

	useEffect(() => {
		if (!usersRights.isAccessGranted(accessRoles)) {
			return;
		}
		setDataTableTools([
			// {
			// 	key: 'view',
			// 	iconId: 'fa-eye',
			// 	onClick: (v: unknown) => {
			// 		// navigate(`/task/${(v as DataBaseTaskData).id}/edit`);
			// 		const item = v as DataBaseProjectData;
			// 		setCurrentSpentTime(item)
			// 		// console.log('>>', { item });
			// 		setIsOpen(true);
			// 	},
			// },
			{
				key: 'edit',
				iconId: 'fa-pencil',
				onClick: (v: unknown) => {
					// navigate(`/task/${(v as DataBaseProjectData).id}/edit`);
					// toolbar.resetToolbarOptions();
					navigate(`/project/${(v as DataBaseProjectData).id}/edit`);
					setToolbarOptions([]);
				},
			},
			// {
			// 	key: 'delete',
			// 	iconId: 'fa-trash-o',
			// 	onClick: (key: string, v: unknown) => {
			// 		console.log('click', (v as DataBaseTaskData).id, key);
			// 	},
			// },
		]);
		dispatch(setProjectListLoading(true));
		// const hash = serverAuth();
		request('/projects').then((projectsData) => {
			if (projectsData.error) {
				pushServerApiSnackbarMessage({ error: projectsData.error });
				// setErrorMessage(serverErrorToString(projectsData.error));
				dispatch(setProjectListLoading(false));
				return;
			}

			if (projectsData.data !== null) {
				setProjectList(projectsData.data as DataBaseProjectData[]);
				console.log('>>>', projectsData.data as DataBaseProjectData[]);
			}
			dispatch(setProjectListLoading(false));
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// const onProjectEdit = (id: string) => {
	// 	navigate(`/project/${id}/edit`);
	// 	setToolbarOptions([]);
	// };

	return (
		<PrivateContent access={accessRoles} serverError={errorMessage}>
			<div className={className}>
				<PageTitle>Список проектов</PageTitle>
				<div className="content">
					<DataTable
						headers={headerList}
						items={projectList}
						tools={dataTableTools}
						loading={isProjectListLoading}
					/>
				</div>
			</div>
		</PrivateContent>
	);
};

export const Projects = styled(ProjectsContainer)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
