import styled from 'styled-components';
import {
	AppComponentsPropsBase,
	DataBaseSpentTimeData,
	DataBaseTaskData,
	DataTableHeader,
	DataTableTool,
	DialogType,
	ToolbarOptions,
} from '@/types';
import { DataTable, Dialog } from '@/components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks/use-app-store';
import { AppUserRole } from '@/constants';
import { selectIsSpentTimeListLoading } from '@/selectors';
import { useToolbarOptions } from '@/hooks';
import { ViewSpentTimeInfo } from '../view-spent-time/view-spent-time';

interface SpentTimeListProps extends AppComponentsPropsBase {
	spentTimeList: DataBaseSpentTimeData[] | null;
}

const headerList: DataTableHeader[] = [
	{
		key: 'comment',
		text: 'Коментарий',
		// link: (v: unknown) => `/task/${(v as DataBaseTaskData)?.id}`,
	},
	{ key: 'executor.name', text: 'Исполнитель' },
	{ key: 'startedAt', text: 'Дата начала', type: 'datetime' },
	{ key: 'duration', text: 'Продолжительность' },
	{ key: 'createdAt', text: 'Дата создания', type: 'datetime' },
];

const accessRoles = [AppUserRole.Admin, AppUserRole.User];

const SpentTimeListContainer = ({ className, spentTimeList }: SpentTimeListProps) => {
	const [dataTableTools, setDataTableTools] = useState<DataTableTool[] | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [currentSpentTime, setCurrentSpentTime] = useState<DataBaseSpentTimeData|null>(null);

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
					setIsOpen(true);
					// navigate(`/spentTime`);
					// toolbar.resetToolbarOptions();
				},
			},
		];
		toolbar.setToolbarOptions(tools);

		setDataTableTools([
			{
				key: 'view',
				iconId: 'fa-eye',
				onClick: (v: unknown) => {
					// navigate(`/task/${(v as DataBaseTaskData).id}/edit`);
					const item = v as DataBaseSpentTimeData;
					setCurrentSpentTime(item)
					// console.log('>>', { item });
					setIsOpen(true);
				},
			},
			{
				key: 'edit',
				iconId: 'fa-pencil',
				onClick: (v: unknown) => {
					navigate(`/task/${(v as DataBaseTaskData).id}/edit`);
					toolbar.resetToolbarOptions();
				},
			},
			// {
			// 	key: 'delete',
			// 	iconId: 'fa-trash-o',
			// 	onClick: (key: string, v: unknown) => {
			// 		console.log('click', (v as DataBaseTaskData).id, key);
			// 	},
			// },
		]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onConfirm = () => {
		setIsOpen(false);
	};

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
			<Dialog
				open={isOpen}
				title='Информация о выполненой работе'
				type={DialogType.Info}
				onCancel={() => setIsOpen(false)}
				onConfirm={onConfirm}
			>
				<ViewSpentTimeInfo item={currentSpentTime} />
			</Dialog>
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
