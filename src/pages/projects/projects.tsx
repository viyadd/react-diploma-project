import { PageTitle, PrivateContent } from '../../components';
import { TableRow } from './components';
import { useEffect, useState } from 'react';
import { request, serverErrorToString } from '../../utils';
import { useAppDispatch } from '../../hooks/use-app-store';
import { ProjectRow } from './components/project-row/project-row';
import { AppComponentsPropsBase, DataBaseProjectData, ToolbarOptions } from '../../types';
import { setToolbarOptionList } from '../../actions';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AppUserRole } from '../../constants';
import { useUserRights } from '../../hooks/use-user-rights';

const accessRoles = [AppUserRole.Admin, AppUserRole.User];

const ProjectsContainer = ({ className }: AppComponentsPropsBase) => {
	const [toolbarOptions, setToolbarOptions] = useState<ToolbarOptions[] | null>(null);
	const [projectList, setProjectList] = useState<DataBaseProjectData[] | []>([]);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
		// const hash = serverAuth();
		request('/projects')
			.then((projectsData) => {
				if (projectsData.error) {
					setErrorMessage(serverErrorToString(projectsData.error));
					return;
				}

				if (projectsData.data !== null) {
					setProjectList(projectsData.data as DataBaseProjectData[]);
				}
			})
	}, []);

	const onProjectEdit = (id: string) => {
		navigate(`/project/${id}/edit`);
		setToolbarOptions([]);
	};

	return (
		<PrivateContent access={accessRoles} serverError={errorMessage}>
			<div className={className}>
				<PageTitle>Список проектов</PageTitle>
				<TableRow>
					<div className="title-column">Название</div>
					<div className="created-at-column">Дата создания</div>
					<div className="state-column">Статус</div>
					<div className="description-column">Описание</div>
				</TableRow>
				{projectList.map(({ id, title, createdAt, description, state }) => (
					<ProjectRow
						key={id}
						id={id}
						title={title}
						createdAt={createdAt}
						description={description}
						state={state}
						onProjectEdit={() => onProjectEdit(id)}
					/>
				))}
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
