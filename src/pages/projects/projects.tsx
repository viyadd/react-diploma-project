import styled from 'styled-components';
import { AppComponentsPropsBase } from '../../shared/interfaces';
import { PageTitle, PrivateContent } from '../../components';
import { TableRow } from './components';
import { useEffect, useState } from 'react';
import { checkAccess } from '../../utils';
import { AppRole } from '../../bff/constants';
import { useAppSelector } from '../../hooks/use-app-store';
import { selectUserRole } from '../../selectors';
import { useServerAuthorization } from '../../hooks';
import { server } from '../../bff';
import { ProjectRow } from './components/project-row/project-row';
import { AppStateData } from '../../reducers';
import { AppProjectData, ProjectsProjections } from '../../bff/shared/model';

const accessRoles = [AppRole.Admin, AppRole.User];

const ProjectsContainer = ({ className }: AppComponentsPropsBase) => {
	const [projectList, setProjectList] = useState<AppProjectData[] | []>([]);
	const [stateList, setStateList] = useState<AppStateData[] | []>([]);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const userRole = useAppSelector(selectUserRole);
	const serverAuth = useServerAuthorization();

	useEffect(() => {
		if (!checkAccess([AppRole.Admin], userRole)) {
			return;
		}
		const hash = serverAuth();
		Promise.all([server.fetchProjects(hash, ProjectsProjections.ProjectsWithStates), server.fetchStates(hash)]).then(
			([projectsData, statesData]) => {
				if (projectsData.error || statesData.error) {
					setErrorMessage(projectsData.error || statesData.error);
					return;
				}

				// console.log('proj', { projectsData, statesData });
				if (projectsData.data !== null) {
					setProjectList(projectsData.data);
				}
				// if (statesData.data !== null) {
				// 	setStateList(statesData.data);
				// }
			},
		);
	}, [serverAuth, stateList, userRole]);

	return (
		<PrivateContent access={accessRoles} serverError={errorMessage}>
			<div className={className}>
				<PageTitle>Список проектов</PageTitle>
				<TableRow>
					<div className="login-column">Название</div>
					<div className="registred-at-column">Дата регистрации</div>
				</TableRow>
				{projectList.map(({ id, title, createdAt, description, state }) => (
					<ProjectRow
						key={id}
						id={id}
						title={title}
						createdAt={createdAt}
						description={description}
						state={state}
						// onUserRemove={() => onUserRemove(id)}
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
