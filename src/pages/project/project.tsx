import { useState } from 'react';
import { PrivateContent } from '../../components';
import { useMatch, useParams } from 'react-router-dom';
import { AppComponentsPropsBase } from '../../shared/interfaces';
import { EditProject, ViewProject } from './componens';
import { AppRole } from '../../bff/constants';
import styled from 'styled-components';

const accessRoles = [AppRole.Admin, AppRole.User];

const ProjectContainer = ({ className }: AppComponentsPropsBase) => {
	const [errorMessage /* , setErrorMessage */] = useState<string | null>(null);
	const params = useParams();
	const isCreating = !!useMatch('/project');
	const isEditing = !!useMatch('/project/:id/edit');

	const getMode = (isCreating: boolean, isEditing: boolean): number =>
		isCreating ? 0 : isEditing ? 1 : 2;

	return (
		<PrivateContent access={accessRoles} serverError={errorMessage}>
			<div className={className}>
				{getMode(isCreating, isEditing) === 2 ? (
					<ViewProject />
				) : (
					<EditProject isNew={isCreating} id={params.id} />
				)}
			</div>
		</PrivateContent>
	);
};

export const Project = styled(ProjectContainer)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
