import styled from 'styled-components';
import {
	AppComponentsPropsBase,
	DataBaseTaskData,
	DataTableHeader,
	DataTableTool,
} from '../../../../../../types';
import { DataTable } from '../../../../../../components';
import { useNavigate } from 'react-router-dom';

interface TaskListProps extends AppComponentsPropsBase {
	taskList: DataBaseTaskData[] | null;
}

const taskHeaderList: DataTableHeader[] = [
	// { key: 'id', text: '' },
	{
		key: 'codeName',
		text: 'Код',
		link: (v: unknown) => `/task/${(v as DataBaseTaskData)?.id}`,
	},
	{ key: 'title', text: 'Заголовок' },
	{ key: 'createdAt', text: 'Дата создания', type: 'datetime' },
	{ key: 'owner.name', text: 'Владелец' },
	{ key: 'executor.name', text: 'Исполнитель' },
	{ key: 'state.text', text: 'Статус' },
	// { key: 'description', },
];


const TaskListContainer = ({ className, taskList }: TaskListProps) => {
	const navigate = useNavigate()


	const tools: DataTableTool[] = [
		{
			key: 'edit',
			iconId: 'fa-pencil',
			onClick: (v: unknown) => {
				navigate(`/task/${(v as DataBaseTaskData).id}/edit`);
			},
		},
		// {
		// 	key: 'delete',
		// 	iconId: 'fa-trash-o',
		// 	onClick: (key: string, v: unknown) => {
		// 		console.log('click', (v as DataBaseTaskData).id, key);
		// 	},
		// },
	];
	return (
		<div className={className}>
			<div className="title">Список задач</div>
			<DataTable headers={taskHeaderList} items={taskList} tools={tools} />
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
