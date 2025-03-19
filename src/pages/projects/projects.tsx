import { DataTable, Dialog, PageTitle, PrivateContent } from '@/components';
import { useEffect, useState } from 'react';
import { pushServerApiSnackbarMessage, request } from '@/utils';
import { useAppDispatch, useAppSelector } from '@/hooks/use-app-store';
import {
	AppComponentsPropsBase,
	DataBaseProjectData,
	DataTableHeader,
	DataTableTool,
	ToolbarOptions,
} from '@/types';
import { setProjectListLoading, setToolbarOptionList } from '@/actions';
import styled from 'styled-components';
import { AppUserRole } from '@/constants';
import { useUserRights } from '@/hooks/use-user-rights';
import { selectIsProjectListLoading } from '@/selectors';
import { EditProject } from './components';

type DialogPrjMode = 'edit' | 'new';

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
	const [currentProject, setCurrentProject] = useState<DataBaseProjectData | null>(null);
	const [dialogPrjMode, setDialogPrjMode] = useState<DialogPrjMode | null>(null);
	const [isOpenPrgDialog, setIsOpenPrjDialog] = useState(false);
	const [updateData, setUpdateData] = useState(false);

	const isProjectListLoading = useAppSelector(selectIsProjectListLoading);

	const dispatch = useAppDispatch();
	// const navigate = useNavigate();
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
					setDialogPrjMode('new');
					setIsOpenPrjDialog(true);
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
				onClick: ({ value }) => {
					setCurrentProject(value as DataBaseProjectData);
					setDialogPrjMode('edit');
					setIsOpenPrjDialog(true);
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
		console.log('>>')
	}, []);

	useEffect(() => {
		if (!usersRights.isAccessGranted(accessRoles)) {
			return;
		}
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
	}, [dispatch, updateData]);

	// todo delete file
	// 	navigate(`/project/${id}/edit`);

	const getDialogTitle = (mode: DialogPrjMode | null) => {
		switch (mode) {
			case 'edit':
				return 'Редактирование записи';
			case 'new':
				return 'Добавить новую запись';
			default:
				return '-';
		}
	};

	const handleProjectDialogClose = () => {
		setIsOpenPrjDialog(false);
	};

	const handleProjectUpdate = (newProject: DataBaseProjectData) => {
		if (projectList === null) {
			setProjectList([newProject]);
			return;
		}
		if (projectList.filter((project) => project.id === newProject.id).length === 0) {
			setUpdateData(!updateData);
		}
		const newProjectList = projectList.map((spentTime) => {
			return spentTime.id === newProject.id ? newProject : spentTime;
		});

		setProjectList(newProjectList);
	};

	return (
		<PrivateContent access={accessRoles}>
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
				<Dialog
					open={isOpenPrgDialog}
					title={getDialogTitle(dialogPrjMode)}
					width="500px"
					onClose={handleProjectDialogClose}
				>
					<EditProject
						item={currentProject}
						onUpdate={handleProjectUpdate}
						onClose={handleProjectDialogClose}
					/>
				</Dialog>
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
