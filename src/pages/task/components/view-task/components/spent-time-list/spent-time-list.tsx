import styled from 'styled-components';
import {
	AppComponentsPropsBase,
	DataBaseSpentTimeData,
	DataBaseTaskData,
	DataTableHeader,
	DataTableTool,
	ToolbarOptions,
} from '@/types';
import { DataTable } from '@/components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks/use-app-store';
import { AppUserRole } from '@/constants';
import { selectIsSpentTimeListLoading } from '@/selectors';
import { useToolbarOptions } from '@/hooks';

interface SpentTimeListProps extends AppComponentsPropsBase {
	spentTimeList: DataBaseSpentTimeData[] | null;
}

const headerList: DataTableHeader[] = [
	{
		key: 'comment',
		text: 'Коментарий',
		link: (v: unknown) => `/task/${(v as DataBaseTaskData)?.id}`,
	},
	{ key: 'executor.name', text: 'Исполнитель' },
	{ key: 'startedAt', text: 'Дата начала', type: 'datetime' },
	{ key: 'endedAt', text: 'Дата завершения', type: 'datetime' },
	{ key: 'createdAt', text: 'Дата создания', type: 'datetime' },
];

const accessRoles = [AppUserRole.Admin, AppUserRole.User];

const SpentTimeListContainer = ({ className, spentTimeList }: SpentTimeListProps) => {
	const [dataTableTools, setDataTableTools] = useState<DataTableTool[] | null>(null);
	const isSpentTimeListLoading = useAppSelector(selectIsSpentTimeListLoading);

	const toolbar = useToolbarOptions();
	const navigate = useNavigate();

	useEffect(() => {
		const tools: ToolbarOptions[] = [
			{
				key: 'add',
				iconId: 'fa-plus',
				accessRoleList: accessRoles,
				onClick: () => {
					navigate(`/spentTime`);
					toolbar.resetToolbarOptions();
				},
			},
		];
		toolbar.setToolbarOptions(tools);
		setDataTableTools([
			{
				key: 'edit',
				iconId: 'fa-pencil',
				onClick: (v: unknown) => {
					navigate(`/task/${(v as DataBaseTaskData).id}/edit`);
					toolbar.resetToolbarOptions()
				},
			},
		]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={className}>
			<div className="content">
				<div className="title">Список выполненых работ</div>
				<DataTable
					headers={headerList}
					items={spentTimeList}
					tools={dataTableTools}
					loading={isSpentTimeListLoading}
				/>
			</div>
		</div>
	);
};

export const SpentTimeList = styled(SpentTimeListContainer)`
	width: 1000px;
	margin-top: 20px;

	& .title {
		text-align: center;
		font-size: 13px;
	}
`;
