import styled from 'styled-components';
import { AppComponentsPropsBase, DataBaseTaskData } from '../../../../../../types';
import { TaskColumn } from './components';
import { DateFormat } from '../../../../../../utils';

interface TaskListProps extends AppComponentsPropsBase {
	taskList: DataBaseTaskData[] | null;
}
interface TaskHeaderList {
	key: string,
	text: string,
	type?: DateFormat
}

const taskHeaderList: TaskHeaderList[] = [
	// { key: 'id', text: '' },
	{ key: 'codeName', text: 'Код' },
	{ key: 'title', text: 'Заголовок' },
	{ key: 'createdAt', text: 'Дата создания', type: 'datetime' },
	{ key: 'owner.name', text: 'Владелец' },
	{ key: 'executor.name', text: 'Исполнитель' },
	{ key: 'state.text', text: 'Статус' },
	// { key: 'description', },
];

const TaskListContainer = ({ className, taskList }: TaskListProps) => {
	return (
		<div className={className}>
			<div className="title">Список задач</div>
			{taskHeaderList.map(({ key, text }) => (
				<div className="header" key={key}>
					{text}
				</div>
			))}
			{taskList?.map(
				(task) =>
					taskHeaderList.map(({ key, type }) => (
						<TaskColumn key={key + task.id} item={task} valuePath={key} type={type} />
					)),
			)}
		</div>
	);
};

export const TaskList = styled(TaskListContainer)`
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	grid-template-rows: 30px 30px repeat(10, 1fr);
	width: 1000px;
	margin-top: 20px;

	& .title {
		grid-column: 1/-1;
		/* background-color: #eee; */
	}

	& .title {
		text-align: center;
		font-size: 13px;
	}
	& .header {
		border-bottom: 1px solid #eee;
		font-weight: bold;
		padding-left: 3px;
	}
`;
