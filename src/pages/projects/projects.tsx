import { DataTable, Dialog, PageTitle, Pagination, PrivateContent } from '@/components';
import { useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/use-app-store';
import {
	AppComponentsPropsBase,
	DataBaseProjectData,
	DataTableHeader,
	DataTableTool,
	ToolbarOptions,
} from '@/types';
import { setToolbarOptionList } from '@/actions';
import styled from 'styled-components';
import { AppUserRole } from '@/constants';
import { selectIsProjectListLoading } from '@/selectors';
import { EditProject } from './components';
import { useProjectLoader } from '@/hooks';
import { UserRightsManagerContext } from '@/context';

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
const PER_PAGE = 3;
const projectLoaderOptions = { pagination: true, limit: PER_PAGE };

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
	const projectLoader = useProjectLoader(projectLoaderOptions);

	const usersRights = useContext(UserRightsManagerContext);

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
			{
				key: 'edit',
				iconId: 'fa-pencil',
				onClick: ({ value }) => {
					setCurrentProject(value as DataBaseProjectData);
					setDialogPrjMode('edit');
					setIsOpenPrjDialog(true);
				},
			},
		]);
	}, []);

	useEffect(() => {
		if (usersRights === null || !usersRights.isAccessGranted(accessRoles)) {
			return;
		}
		if (projectLoader.page === null) {
			projectLoader.setCurrentPage(1);
		}
	}, [projectLoader, usersRights]);

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
		setCurrentProject(null);
		setIsOpenPrjDialog(false);
	};

	const handleProjectUpdate = (newProject: DataBaseProjectData) => {
		if (projectList === null) {
			setProjectList([newProject]);
			setCurrentProject(null);
			return;
		}
		if (projectList.filter((project) => project?.id === newProject?.id).length === 0) {
			setUpdateData(!updateData);
			setCurrentProject(null);
			return;
		}
		const newProjectList = projectList.map((project) => {
			return project.id === newProject.id ? newProject : project;
		});

		setProjectList(newProjectList);
		setCurrentProject(null);
	};

	return (
		<PrivateContent access={accessRoles}>
			<div className={className}>
				<PageTitle>Список проектов</PageTitle>
				<div className="content">
					<DataTable
						headers={headerList}
						items={projectLoader.projectList}
						tools={dataTableTools}
						loading={isProjectListLoading}
					/>
					<Pagination
						lastPage={projectLoader.lastPage}
						page={projectLoader.page}
						setPage={projectLoader.setCurrentPage}
						width="auto"
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
