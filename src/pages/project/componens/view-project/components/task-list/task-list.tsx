import styled from 'styled-components';
import {
	AppComponentsPropsBase,
	DataBaseProjectData,
	DataBaseTaskData,
	DataTableHeader,
	DataTableTool,
	DialogType,
	ToolbarOptions,
} from '@/types';
import { DataTable, Dialog } from '@/components';
// import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/use-app-store';
import { selectIsTaskListLoading } from '@/selectors';
import { useEffect, useState } from 'react';
import { TaskEdit } from './components';
import { pushServerApiSnackbarMessage, request } from '@/utils';
import { setTaskListLoading } from '@/actions';
import { AppUserRole } from '@/constants';
import { useToolbarOptions } from '@/hooks';

interface TaskListProps extends AppComponentsPropsBase {
	project: DataBaseProjectData;
	taskList: DataBaseTaskData[] | null;
	onUpdateTask: (task: DataBaseTaskData) => void;
}
const accessRoles = [AppUserRole.Admin, AppUserRole.User];

const taskHeaderList: DataTableHeader[] = [
	// { key: 'id', text: '' },
	{
		key: 'codeName',
		text: 'Код',
		link: (v: unknown) => `/task/${(v as DataBaseTaskData)?.id}`,
	},
	{ key: 'title', text: 'Заголовок' },
	{ key: 'state.text', text: 'Статус' },
	{ key: 'createdAt', text: 'Дата создания', type: 'datetime' },
	{ key: 'owner.name', text: 'Владелец' },
	{ key: 'executor.name', text: 'Исполнитель' },
	// { key: 'description', },
];

const TaskListContainer = ({
	className,
	project,
	taskList,
	onUpdateTask,
}: TaskListProps) => {
	const [isShowDialog, setIsShowDialog] = useState(false);
	const [isShowConfirm, setIsShowConfirm] = useState(false);
	const [currentTask, setCurrentTask] = useState<DataBaseTaskData | null>(null);
	const [dataTableTools, setDataTableTools] = useState<DataTableTool[] | null>(null);

	const toolbar = useToolbarOptions();
	const isTaskListLoading = useAppSelector(selectIsTaskListLoading);

	const dispatch = useAppDispatch();

	useEffect(() => {
		setDataTableTools([
			{
				key: 'edit',
				iconId: 'fa-pencil',
				tooltip: 'Редактировать',
				onClick: ({ value }) => {
					setIsShowDialog(true);
					setCurrentTask(value as DataBaseTaskData);
					// navigate(`/task/${(v as DataBaseTaskData).id}/edit`);
				},
			},
			{
				key: 'setExecutor',
				iconId: 'fa-user-o', // fa-trash-o
				tooltip: 'Назначить себя исполнителем',
				onClick: ({ value }) => {
					setCurrentTask(value as DataBaseTaskData);
					setIsShowConfirm(true);
				},
			},
		]);
		const tools: ToolbarOptions[] = [
			{
				key: 'add',
				iconId: 'fa-plus',
				tooltip: 'Добавить новую задачу',
				accessRoleList: accessRoles,
				onClick: () => {
					setIsShowDialog(true);
					// navigate(`/project`);
					// toolbar.resetToolbarOptions();
				},
			},
		];
		toolbar.setToolbarOptions(tools);

		// if (toolbarOptions === null) {
		// 	setToolbarOptions(tools);
		// 	return;
		// }
		// dispatch(setToolbarOptionList(toolbarOptions));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleExecutorChangeConfirmed = () => {
		setIsShowConfirm(false);
		if (currentTask?.id === undefined) {
			return;
		}
		dispatch(setTaskListLoading(true));

		request(`/tasks/${currentTask.id}/executor`, 'PATCH').then((savedTask) => {
			if (savedTask.error) {
				pushServerApiSnackbarMessage({ error: savedTask.error });
			}
			onUpdateTask(savedTask.data as DataBaseTaskData);
			dispatch(setTaskListLoading(false));
		});
	};

	const closeTaskEditDialog = () => {
		setIsShowDialog(false);
		setCurrentTask(null);
	};
	const handleTaskEditDialogClose = () => {
		closeTaskEditDialog();
	};

	const handleTaskUpdate = (task: DataBaseTaskData) => {
		onUpdateTask(task);
		closeTaskEditDialog();
	};

	return (
		<div className={className}>
			<div className="title">Список задач</div>
			<DataTable
				headers={taskHeaderList}
				items={taskList}
				tools={dataTableTools}
				loading={isTaskListLoading}
			/>
			<Dialog
				open={isShowConfirm}
				type={DialogType.YesNo}
				onClose={() => setIsShowConfirm(false)}
				onConfirm={handleExecutorChangeConfirmed}
			>
				Изменить исполнителя?
			</Dialog>
			<Dialog
				open={isShowDialog}
				title={currentTask === null ? 'Создать новую задачу' : 'Редактировать задачу'}
				onClose={handleTaskEditDialogClose}
				width="600px"
			>
				<TaskEdit
					projectCode={project.title}
					item={currentTask}
					onUpdateTask={handleTaskUpdate}
					onClose={handleTaskEditDialogClose}
				/>
			</Dialog>
		</div>
	);
};

export const TaskList = styled(TaskListContainer)`
	width: 1000px;
	margin-top: 20px;

	& .title {
		text-align: center;
		font-size: 13px;
	}
`;
