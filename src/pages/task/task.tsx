import { PrivateContent } from '../../components';
import { AppComponentsPropsBase } from '../../types';
import styled from 'styled-components';
import { AppUserRole } from '../../constants';
import { ViewTask } from './components';

const accessRoles = [AppUserRole.Admin, AppUserRole.User];

const TaskContainer = ({ className }: AppComponentsPropsBase) => {
	return (
		<PrivateContent access={accessRoles}>
			<div className={className}>
				<ViewTask />
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
