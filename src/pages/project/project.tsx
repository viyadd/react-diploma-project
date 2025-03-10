import { useState } from 'react';
import { PrivateContent } from '../../components';
import { useMatch, useParams } from 'react-router-dom';
import { AppComponentsPropsBase } from '../../types';
import { EditProject, ViewProject } from './componens';
import styled from 'styled-components';
import { AppUserRole } from '../../constants';

const accessRoles = [AppUserRole.Admin, AppUserRole.User];

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
