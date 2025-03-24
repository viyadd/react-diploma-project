import { AppComponentsPropsBase, BarChartData, ValueKeyBarChart } from '@/types';
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	Rectangle,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import styled from 'styled-components';

interface AnalyticsBarChartProps extends AppComponentsPropsBase {
	valueKeyList: ValueKeyBarChart[];
	dataList: BarChartData[] | null;
	width?: string;
	height?: string;
}

const getData = (dataList: BarChartData[] | null) => {
	return dataList === null
		? []
		: dataList.map(({ name, values }) => ({ name, ...values }));
};

const AnalyticsBarChartContainer = ({
	className,
	valueKeyList,
	dataList,
}: AnalyticsBarChartProps) => {
	return (
		<div className={className}>
			<ResponsiveContainer width="100%" height="100%">
				<BarChart
					width={500}
					height={300}
					data={getData(dataList)}
					margin={{
						top: 5,
						right: 30,
						left: 20,
						bottom: 5,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Legend />
					{valueKeyList.map(({ key, fill, activeBar }) => (
						<Bar
							key={key}
							dataKey={key}
							fill={fill}
							activeBar={<Rectangle fill={activeBar.fill} stroke={activeBar.stroke} />}
						/>
					))}
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};
export const AnalyticsBarChart = styled(AnalyticsBarChartContainer)`
	width: 500px;
	height: 250px;
`;
