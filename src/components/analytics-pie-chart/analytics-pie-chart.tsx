import { AppComponentsPropsBase } from '@/types';
import { Cell, Legend, Pie, PieChart } from 'recharts';
import styled from 'styled-components';
import { PieCustomizedLabel } from './components';

export type ChartData = {
	name: string;
	value: number;
};

interface AnalyticsPieChart extends AppComponentsPropsBase {
	data: ChartData[];
	loading?: boolean;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AnalyticsPieChartContainer = ({ className, data }: AnalyticsPieChart) => {
	return (
		<div className={className}>
			<PieChart width={400} height={230}>
				<Pie
					data={data}
					cx="50%"
					cy="50%"
					labelLine={false}
					label={PieCustomizedLabel}
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
		</div>
	);
};

export const AnalyticsPieChart = styled(AnalyticsPieChartContainer)``;
