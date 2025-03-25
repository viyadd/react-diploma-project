import {
	DataTable,
	HideBox,
	PageTitle,
	Pagination,
	AnalyticsPieChart,
} from '@/components';
import { ChartData } from '@/components/analytics-pie-chart/analytics-pie-chart';
import { AppUserRole } from '@/constants';
import { useAnalyticsProjectTasksLoader, useProjectTasksLoader } from '@/hooks';
import { useAppSelector } from '@/hooks/use-app-store';
import { useUserRights } from '@/hooks/use-user-rights';
import { selectIsAccessRightLoading } from '@/selectors';
import {
	AppComponentsPropsBase,
	DataTableHeader,
	isValueStatusAnalyticsData,
	ValueKeyBarChart,
	BarChartData,
	isValueDBAnalyticsTaskData,
	DataBaseTaskData,
} from '@/types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { AnalyticsBarChart } from './components';

interface ViewProjectAnalyticsProps extends AppComponentsPropsBase {
	onSelect?: () => void;
}
const accessRoles = [AppUserRole.Admin, AppUserRole.User];

const headerList: DataTableHeader[] = [
	{ key: 'text', text: 'Статус' },
	{ key: 'count', text: 'Количество' },
];
const projectTaskHeaderList: DataTableHeader[] = [
	{
		key: 'codeName',
		text: 'Код',
		link: (v: unknown) => `/task/${(v as DataBaseTaskData)?.id}`,
	},
	{ key: 'title', text: 'Название' },
	{ key: 'state.text', text: 'Статус' },
	{ key: 'description', text: 'Описание' },
	{ key: 'expectedSpentTime', text: 'Время план.(мин)' },
];

const PER_PAGE = 3;

const valueKeys: ValueKeyBarChart[] = [
	{ key: 'est', fill: '#8884d8', activeBar: { fill: 'pink', stroke: 'blue' } },
	{ key: 'dst', fill: '#82ca9d', activeBar: { fill: 'gold', stroke: 'purple' } },
];

const ViewProjectAnalyticsContainer = ({ className }: ViewProjectAnalyticsProps) => {
	const [dataPieChart, setDataPieChart] = useState<ChartData[]>([]);
	const [dataBarChart, setDataBarChart] = useState<BarChartData[] | null>(null);
	const isAccessRightLoading = useAppSelector(selectIsAccessRightLoading);

	const params = useParams();
	const projectTaskLoader = useProjectTasksLoader({ limit: PER_PAGE });
	const analyticsProjectTasks = useAnalyticsProjectTasksLoader();
	const usersRights = useUserRights();

	useEffect(() => {
		if (!usersRights.isAccessGranted(accessRoles)) {
			return;
		}
		if (params.id === undefined) {
			return;
		}
		analyticsProjectTasks.load(params.id);
		projectTaskLoader.setProjectId(params.id);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAccessRightLoading, params.id]);

	useEffect(() => {
		const statusesData = analyticsProjectTasks.statusAnalyticsList;
		const tasksData = analyticsProjectTasks.taskAnalyticsList;
		if (Array.isArray(statusesData)) {
			const statuses = statusesData.filter(isValueStatusAnalyticsData);
			setDataPieChart(
				statuses.map((status) => ({ name: status.text, value: status.count })),
			);
		}
		if (Array.isArray(tasksData)) {
			const tasks = tasksData.filter(isValueDBAnalyticsTaskData);
			setDataBarChart(
				tasks?.map((task) => ({
					name: task.codeName,
					values: {
						est: task.expectedSpentTime,
						dst: task.spentTimeDuration,
					},
				})),
			);
		}
	}, [
		analyticsProjectTasks.statusAnalyticsList,
		analyticsProjectTasks.taskAnalyticsList,
	]);

	const isLoading = isAccessRightLoading || analyticsProjectTasks.isStatusListLoading;

	return (
		<div className={className}>
			<PageTitle>Задачи по статусам</PageTitle>
			<div className="chart">
				{analyticsProjectTasks.statusAnalyticsList && (
					<AnalyticsPieChart data={dataPieChart} />
				)}
				<AnalyticsBarChart valueKeyList={valueKeys} dataList={dataBarChart} />
			</div>
			<HideBox label="дополнительная информация">
				<div className="content">
					<DataTable
						headers={headerList}
						items={analyticsProjectTasks.statusAnalyticsList}
						loading={isLoading}
						width="380px"
					/>
				</div>
			</HideBox>
			<div>
				<DataTable
					headers={projectTaskHeaderList}
					items={projectTaskLoader.taskList}
					loading={isLoading || projectTaskLoader.isTaskListLoading}
					width="auto"
					rows={PER_PAGE}
				/>
				<Pagination
					lastPage={projectTaskLoader.lastPage}
					page={projectTaskLoader.page}
					setPage={projectTaskLoader.setPage}
					width="auto"
				/>
			</div>
		</div>
	);
};

export const ViewProjectAnalytics = styled(ViewProjectAnalyticsContainer)`
	& .chart {
		display: flex;
	}

	& .recharts-legend-wrapper {
		font-size: 12px;
	}
`;
