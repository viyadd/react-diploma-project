import styled from 'styled-components';
import {
	AppComponentsPropsBase,
	DataBaseSpentTimeData,
	DataTableHeader,
	DataTableTool,
	DialogType,
	// DialogType,
	ToolbarOptions,
} from '@/types';
import { DataTable, Dialog } from '@/components';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks/use-app-store';
import { AppUserRole } from '@/constants';
import { selectIsSpentTimeListLoading } from '@/selectors';
import { useToolbarOptions } from '@/hooks';
import { ViewSpentTime } from '../view-spent-time/view-spent-time';
import { EditSpentTime } from '../edit-spent-time/edit-spent-time';

interface SpentTimeListProps extends AppComponentsPropsBase {
	spentTimeList: DataBaseSpentTimeData[] | null;
	onUpdateSpentTime: (spentTime: DataBaseSpentTimeData) => void;
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

type DialogMode = 'info' | 'edit' | 'new' | null;

const accessRoles = [AppUserRole.Admin, AppUserRole.User];

const SpentTimeListContainer = ({
	className,
	spentTimeList,
	onUpdateSpentTime,
}: SpentTimeListProps) => {
	const [dataTableTools, setDataTableTools] = useState<DataTableTool[] | null>(null);
	const [isOpenDialog, setIsOpenDialog] = useState(false);
	const [dialogMode, setDialogMode] = useState<DialogMode>(null);
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
				tooltip: 'Добавить запись выполненной работы',
				accessRoleList: accessRoles,
				onClick: () => {
					setDialogMode('new');
					setCurrentSpentTime(null);
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
					setDialogMode('info');
					const item = value as DataBaseSpentTimeData;
					setCurrentSpentTime(item);
					setIsOpenDialog(true);
				},
			},
			{
				key: 'edit',
				iconId: 'fa-pencil',
				onClick: ({ value }) => {
					setDialogMode('edit');
					const item = value as DataBaseSpentTimeData;
					setCurrentSpentTime(item);
					setIsOpenDialog(true);
				},
			},
		]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const closeSpentTimeEditDialog = () => {
		setIsOpenDialog(false);
	};

	const handleSpentTimeEditDialogClose = () => {
		closeSpentTimeEditDialog();
	};

	const handleSpentTimeUpdate = (spentTime: DataBaseSpentTimeData) => {
		onUpdateSpentTime(spentTime);
		closeSpentTimeEditDialog();
	};

	const getDialogTitle = (mode: DialogMode) => {
		switch (mode) {
			case 'info':
				return 'Информация о выполненой работе';
			case 'edit':
				return 'Редактирование записи';
			case 'new':
				return 'Добавить новую запись';
			default:
				return '-';
		}
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
				open={isOpenDialog}
				title={getDialogTitle(dialogMode)}
				type={dialogMode === 'info' ? DialogType.Info : undefined}
				width="500px"
				onClose={handleSpentTimeEditDialogClose}
			>
				{dialogMode === 'info' && <ViewSpentTime item={currentSpentTime} />}
				{['edit', 'new'].includes(dialogMode!) && (
					<EditSpentTime
						item={currentSpentTime}
						onUpdate={handleSpentTimeUpdate}
						onClose={handleSpentTimeEditDialogClose}
					/>
				)}
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
