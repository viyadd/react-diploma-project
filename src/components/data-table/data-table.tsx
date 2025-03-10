import styled from 'styled-components';
import {
	AppComponentsPropsBase,
	DataTableHeader,
	DataTableHeaderWithTools,
	DataTableTool,
} from '../../types';
import { DataTableCellElement } from './components';

interface DataTableProps extends AppComponentsPropsBase {
	items: { id: string }[] | null;
	headers: DataTableHeader[];
	tools?: DataTableTool[];
}

const DataTableContainer = ({ className, headers, items, tools }: DataTableProps) => {
	const getColumns = (
		h: DataTableHeader[],
		t?: DataTableTool[],
	): DataTableHeaderWithTools[] => {
		// const columns =
		if (tools !== undefined) {
			return [...h, { key: '_tools', tools: t }];
		}
		return h;
	};
	const isHeaderWithTools = (index: number) => {
		return tools !== undefined && index === headers.length - 1;
	};

	return (
		<div className={className}>
			{headers.map(({ key, text }, i) => (
				<div className={'header' + (isHeaderWithTools(i) ? ' tools' : '')} key={key}>
					{text}
				</div>
			))}
			{items?.map((item) =>
				getColumns(headers, tools).map((header) => (
					<DataTableCellElement
						key={header.key + item.id}
						item={item}
						header={header}
					/>
				)),
			)}
		</div>
	);
};

const calccalculateGridRows = ({ items }: DataTableProps) =>
	`repeat(${items === null ? 1 : items.length}, auto)`;

const calccalculateGridColumns = ({ headers, tools }: DataTableProps) => {
	const columnsOptions = `repeat(${headers.length}, auto)`
	const toolOptions = tools !== undefined ? `${tools.length*26}px` : ''
	return [columnsOptions, toolOptions].filter(Boolean).join(' ')
};

export const DataTable = styled(DataTableContainer)`
	display: grid;
	grid-template-columns: ${calccalculateGridColumns};
	grid-template-rows: 30px ${calccalculateGridRows};
	width: 1000px;
	margin-top: 20px;

	& .header {
		border-bottom: 1px solid #eee;
		font-weight: bold;
		padding-left: 3px;
	}
	& .tools {
		grid-column: span 2/-1;
	}
`;
