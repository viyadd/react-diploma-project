import { useState } from 'react';
import { PrivateContent } from '../../components';
import { useMatch, useParams } from 'react-router-dom';
import { AppComponentsPropsBase } from '../../types';
import styled from 'styled-components';
import { AppUserRole } from '../../constants';
import { ViewTask } from './components';

const accessRoles = [AppUserRole.Admin, AppUserRole.User];

const TaskContainer = ({ className }: AppComponentsPropsBase) => {
	const [errorMessage /* , setErrorMessage */] = useState<string | null>(null);
	const params = useParams();
	const isCreating = !!useMatch('/task');
	const isView = !!useMatch('/task/:id');
	const isAdd = !!useMatch('/task/:id/add');
	const isEditing = !!useMatch('/task/:id/edit');

	const getMode = (isCreating: boolean, isEditing: boolean): number =>
		isCreating ? 0 : isEditing ? 1 : 2;

	return (
		<PrivateContent access={accessRoles} serverError={errorMessage}>
			<div className={className}>
				{getMode(isCreating, isEditing) === 2 ? (
					<ViewTask />
				) : (
					<div>EditTask</div>// <EditTask isNew={isCreating} id={params.id} />
				)}
			</div>
		</PrivateContent>
	);
};

export const Task = styled(TaskContainer)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
