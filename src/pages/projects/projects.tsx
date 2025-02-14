import { AppComponentsPropsBase, ToolbarOptions } from '../../shared/interfaces';
import { PageTitle, PrivateContent } from '../../components';
import { TableRow } from './components';
import { useEffect, useState } from 'react';
import { checkAccess } from '../../utils';
import { AppRole } from '../../bff/constants';
import { useAppDispatch, useAppSelector } from '../../hooks/use-app-store';
import { selectUserRole } from '../../selectors';
import { useServerAuthorization } from '../../hooks';
import { server } from '../../bff';
import { ProjectRow } from './components/project-row/project-row';
import { AppProjectData, ProjectProjections } from '../../bff/shared/model';
import { setToolbarOptionList } from '../../actions';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const accessRoles = [AppRole.Admin, AppRole.User];

const ProjectsContainer = ({ className }: AppComponentsPropsBase) => {
	const [toolbarOptions, setToolbarOptions] = useState<ToolbarOptions[] | null>(null);
	const [projectList, setProjectList] = useState<AppProjectData[] | []>([]);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const userRole = useAppSelector(selectUserRole);
	const dispatch = useAppDispatch();
	const serverAuth = useServerAuthorization();
	const navigate = useNavigate();

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
		if (!checkAccess([AppRole.Admin], userRole)) {
			return;
		}
		const hash = serverAuth();
		Promise.all([
			server.fetchProjects(hash, ProjectProjections.ProjectWithStates),
			server.fetchStates(hash),
		]).then(([projectsData, statesData]) => {
			if (projectsData.error || statesData.error) {
				setErrorMessage(projectsData.error || statesData.error);
				return;
			}

			if (projectsData.data !== null) {
				setProjectList(projectsData.data);
			}
		});
	}, [serverAuth, userRole]);

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
