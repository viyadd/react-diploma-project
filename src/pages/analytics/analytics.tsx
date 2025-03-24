// import { useState } from 'react';
import { PrivateContent } from '../../components';
import { useMatch } from 'react-router-dom';
import { AppComponentsPropsBase } from '../../types';
// import { EditProject, ViewProject } from './componens';
import styled from 'styled-components';
import { AppUserRole } from '../../constants';
import { ViewCommonAnalytics, ViewProjectAnalytics } from './components';

const accessRoles = [AppUserRole.Admin, AppUserRole.User];

const AnalyticsContainer = ({ className }: AppComponentsPropsBase) => {
	const isAllProjects = !!useMatch('/analytics');
	const isProjectById = !!useMatch('/analytics/project/:id');

	return (
		<PrivateContent access={accessRoles}>
			<div className={className}>
				{isAllProjects && <ViewCommonAnalytics />}
				{isProjectById && <ViewProjectAnalytics />}
			</div>
		</PrivateContent>
	);
};

export const Analytics = styled(AnalyticsContainer)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
