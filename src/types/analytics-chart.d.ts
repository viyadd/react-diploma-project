export type BarChartData = {
	name: string;
	values: {
		[key: string]: number;
	};
};

export interface ValueKeyBarChart {
	key: string;
	fill: string;
	activeBar: {
		fill: string;
		stroke: string;
	};
}
