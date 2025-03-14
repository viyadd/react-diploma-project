import styled from 'styled-components';
import {
	AppComponentsPropsBase,
	DataBaseSpentTimeData,
	DataTableHeader,
	DataTableTool,
	DialogType,
	ToolbarOptions,
} from '@/types';
import { DataTable, Dialog } from '@/components';
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
	const [isOpenDialog, setIsOpenDialog] = useState(false);
	const [currentSpentTime, setCurrentSpentTime] = useState<DataBaseSpentTimeData | null>(
		null,
	);

	const isSpentTimeListLoading = useAppSelector(selectIsSpentTimeListLoading);

	const toolbar = useToolbarOptions();
	// const navigate = useNavigate();

	useEffect(() => {
		const tools: ToolbarOptions[] = [
			{
				key: 'add',
				iconId: 'fa-plus',
				accessRoleList: accessRoles,
				onClick: () => {
					setIsOpenDialog(true);
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
				onClick: ({ value }) => {
					const item = value as DataBaseSpentTimeData;
					console.log('view', value);
					setCurrentSpentTime(item);
					setIsOpenDialog(true);
				},
			},
			{
				key: 'edit',
				iconId: 'fa-pencil',
				onClick: ({ value }) => {
					const item = value as DataBaseSpentTimeData;
					setCurrentSpentTime(item);
					setIsOpenDialog(true);
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

	// const onConfirm = () => {
	// 	setIsOpenDialog(false);
	// };

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
				open={isOpenDialog}
				title="Информация о выполненой работе"
				type={DialogType.Info}
				onClose={() => setIsOpenDialog(false)}
				// onConfirm={onConfirm}
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
