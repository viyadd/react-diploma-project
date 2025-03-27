import styled from 'styled-components';
import {
	AppComponentsPropsBase,
	DataTableHeader,
	DataTableHeaderWithTools,
	DataTableTool,
	OrderByProps,
} from '@/types';
import { DataTableCellElement } from './components';
import { SkeletonLoader } from '../skeleton-loader/skeleton-loader';
import { useEffect, useState } from 'react';
import { IconButton } from '../icon-button/icon-button';

interface DataTableProps extends AppComponentsPropsBase {
	items: { id: string }[] | null;
	headers: DataTableHeader[];
	tools?: DataTableTool[] | null;
	loading?: boolean;
	width?: string;
	minHeight?: string;
	rows?: number;
	onSort?: (key: string, sort: OrderByProps | null) => void;
}

interface DataTableHeaderParams extends DataTableHeader {
	orderBy: OrderByProps | null;
}

const DataTableContainer = ({
	className,
	headers,
	items,
	tools,
	loading,
	width,
	rows,
	onSort,
}: DataTableProps) => {
	const [localHeaders, setLocalHeaders] = useState<DataTableHeaderParams[]>([]);

	useEffect(() => {
		setLocalHeaders(
			headers.map((header) => {
				return { ...header, orderBy: null };
			}),
		);
	}, [headers]);

	const getColumns = (
		h: DataTableHeader[],
		t?: DataTableTool[] | null,
	): DataTableHeaderWithTools[] => {
		if (t !== undefined && t !== null) {
			return [...h, { key: '_tools', tools: t }];
		}
		return h;
	};
	const isHeaderWithTools = (index: number) => {
		return tools !== undefined && index === headers.length - 1;
	};

	const getIconId = (key: string) => {
		const header = localHeaders.find(({ key: currentKey }) => currentKey === key);
		switch (header?.orderBy) {
			case 'asc':
				return 'fa-sort-asc';
			case 'desc':
				return 'fa-sort-desc';
			default:
				return 'fa-sort';
		}
	};

	const handleOnSort = (key: string) => {
		const headerIndex = localHeaders.findIndex(
			({ key: currentKey }) => currentKey === key,
		);

		switch (localHeaders[headerIndex].orderBy) {
			case 'asc':
				localHeaders[headerIndex].orderBy = 'desc';
				break;
			case 'desc':
				localHeaders[headerIndex].orderBy = null;
				break;
			default:
				localHeaders[headerIndex].orderBy = 'asc';
		}
		setLocalHeaders([...localHeaders]);
		if (
			typeof onSort === 'function' &&
			typeof localHeaders[headerIndex].sortKey === 'string'
		) {
			onSort(localHeaders[headerIndex].sortKey, localHeaders[headerIndex].orderBy);
		}
	};

	return (
		<div className={className}>
			<div className="skeleton-loader">
				<SkeletonLoader type="table-header" loading={loading} width={width} />
				<SkeletonLoader type="table-tbody" loading={loading} width={width} rows={rows} />
			</div>
			{!loading && (
				<div className="content">
					{localHeaders.map(({ key, text, sortable }, i) => (
						<div className={'header' + (isHeaderWithTools(i) ? ' tools' : '')} key={key}>
							{text}
							{sortable && (
								<IconButton
									id={getIconId(key)}
									iconSize="13px"
									onClick={() => handleOnSort(key)}
								/>
							)}
						</div>
					))}
					{items?.map((item) =>
						getColumns(headers, tools).map((header) => (
							<DataTableCellElement
								key={header.key + item?.id}
								item={item}
								header={header}
							/>
						)),
					)}
				</div>
			)}
		</div>
	);
};

const calccalculateGridRows = ({ items }: DataTableProps) =>
	`repeat(${items === null ? 1 : items.length}, auto)`;

const calccalculateGridColumns = ({ headers, tools }: DataTableProps) => {
	const columnsOptions = `repeat(${headers.length}, auto)`;
	const toolOptions =
		tools !== undefined && tools !== null ? `${tools.length * 26}px` : '';
	return [columnsOptions, toolOptions].filter(Boolean).join(' ');
};

export const DataTable = styled(DataTableContainer)`
	min-height: ${({ minHeight = '100%' }) => minHeight};
	& .content {
		display: grid;
		grid-template-columns: ${calccalculateGridColumns};
		grid-template-rows: 30px ${calccalculateGridRows};
		width: ${({ width = '1000px' }) => width};
		margin-top: 20px;
	}

	& .header {
		display: flex;
		border-bottom: 1px solid #eee;
		font-weight: bold;
		padding-left: 6px;
	}
	& .tools {
		grid-column: span 2/-1;
	}
	& .skeleton-loader {
		margin-top: 20px;
	}
`;
