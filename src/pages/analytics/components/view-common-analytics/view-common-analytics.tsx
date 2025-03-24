import { setStatusListLoading } from '@/actions';
import { DataTable, HideBox, PageTitle, Pagination } from '@/components';
import { AppUserRole } from '@/constants';
import { useProjectLoader } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/hooks/use-app-store';
import { useUserRights } from '@/hooks/use-user-rights';
import {
	selectIsAccessRightLoading,
	selectIsProjectListLoading,
	selectIsStatusListLoading,
} from '@/selectors';
import {
	AppComponentsPropsBase,
	DataBaseProjectData,
	DBStatusAlyticsData,
	DataTableHeader,
	isValueServerResponseErrorData,
	isValueStatusAnalyticsData,
} from '@/types';
import { pushSnackbarMessage, request } from '@/utils';
import { useEffect, useState } from 'react';
import { Cell, Legend, Pie, PieChart /* ResponsiveContainer */ } from 'recharts';
import styled from 'styled-components';

interface ViewCommonAnalyticsProps extends AppComponentsPropsBase {
	onSelect?: () => void;
}
const accessRoles = [AppUserRole.Admin, AppUserRole.User];

type ChartData = {
	name: string;
	value: number;
};
interface LabelFuncProps {
	cx: number;
	cy: number;
	midAngle: number;
	innerRadius: number;
	outerRadius: number;
	percent: number;
	index?: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
	cx,
	cy,
	midAngle,
	innerRadius,
	outerRadius,
	percent,
}: // index,
LabelFuncProps) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	return (
		<text
			x={x}
			y={y}
			fill="white"
			textAnchor={x > cx ? 'start' : 'end'}
			dominantBaseline="central"
		>
			{`${(percent * 100).toFixed(0)}%`}
		</text>
	);
};

const headerList: DataTableHeader[] = [
	{ key: 'text', text: 'Статус' },
	{ key: 'count', text: 'Количество' },
];
const projectHeaderList: DataTableHeader[] = [
	{
		key: 'title',
		text: 'Название',
		link: (v: unknown) => `/analytics/project/${(v as DataBaseProjectData)?.id}`,
	},
	{ key: 'state.text', text: 'Статус' },
	{ key: 'description', text: 'Описание' },
];

const PER_PAGE = 3

const ViewCommonAnalyticsContainer = ({ className }: ViewCommonAnalyticsProps) => {
	const [statusList, setStatusList] = useState<DBStatusAlyticsData[] | null>(null);
	const [data, setData] = useState<ChartData[]>([]);
	const isAccessRightLoading = useAppSelector(selectIsAccessRightLoading);
	const isStatusListLoadingg = useAppSelector(selectIsStatusListLoading);
	const isProjectListLoading = useAppSelector(selectIsProjectListLoading);

	const projectLoader = useProjectLoader({ pagination: true, limit: PER_PAGE });
	const usersRights = useUserRights();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!usersRights.isAccessGranted(accessRoles)) {
			return;
		}
		projectLoader.load();
		dispatch(setStatusListLoading(true));
		// dispatch(setProjectListLoading(true));
		request('/analytics/projects').then((statusesData) => {
			if (isValueServerResponseErrorData(statusesData.error)) {
				pushSnackbarMessage.errorServerApi(statusesData.error);
				dispatch(setStatusListLoading());
				return;
			}

			// console.log('t', statusesData)
			const {data} = statusesData
			if (Array.isArray(data)) {
				const statuses = data.filter(isValueStatusAnalyticsData);
				setStatusList(statuses);
				setData(
					statuses
						.filter((status) => status.code !== 'done')
						.map((status) => ({ name: status.text, value: status.count })),
				);
			}
			dispatch(setStatusListLoading());
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAccessRightLoading]);

	const isLoading = isStatusListLoadingg || isAccessRightLoading;

	return (
		<div className={className}>
			<PageTitle>Проекты по статусам</PageTitle>
			{statusList && (
				<>
					<PieChart width={400} height={230}>
						<Pie
							data={data}
							cx="50%"
							cy="50%"
							labelLine={false}
							label={renderCustomizedLabel}
							outerRadius={80}
							fill="#8884d8"
							dataKey="value"
						>
							{data.map((_, index) => (
								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
							))}
						</Pie>
						<Legend verticalAlign="bottom" height={36} />
					</PieChart>
				</>
			)}
			<HideBox label="дополнительная информация">
				<div className="content">
					<DataTable
						headers={headerList}
						items={statusList}
						// tools={dataTableTools}
						loading={isLoading}
						width="380px"
					/>
				</div>
			</HideBox>
			<DataTable
				headers={projectHeaderList}
				items={projectLoader.projectList}
				// tools={dataTableTools}
				loading={isLoading || isProjectListLoading}
				width="500px"
				rows={PER_PAGE}
			/>
			<Pagination
				lastPage={projectLoader.lastPage}
				page={projectLoader.page}
				setPage={projectLoader.setPage}
				width='auto'
			/>
		</div>
	);
};

export const ViewCommonAnalytics = styled(ViewCommonAnalyticsContainer)`
	& .recharts-legend-wrapper {
		font-size: 12px;
	}
`;
