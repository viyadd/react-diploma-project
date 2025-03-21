import { InfoBox } from '@/components';
import { AppComponentsPropsBase, DataBaseUserData } from '@/types';
import { formatDate } from '@/utils';
import styled from 'styled-components';

interface ViewUserProps extends AppComponentsPropsBase {
	item: DataBaseUserData | null;
}

const ViewUserContainer = ({ className, item }: ViewUserProps) => {
	const getFullName = ({ surname, name, patronymic }: DataBaseUserData) => {
		// const { surname, name, patronymic } = executor ?? {};
		return [surname, name, patronymic].filter(Boolean).join(' ');
	};

	// const getTotalTime = ({ startedAt, endedAt }: DataBaseSpentTimeData) => {
	// 	return getSpentTime(startedAt, endedAt);
	// };

	if (item === null) {
		return;
	}

	return (
		<div className={className}>
			{[
				['Логин', item.login],
				['ФИО', getFullName(item)],
				['Зарегистрирован', formatDate(item.registredAt, 'datetime')],
				['Роль', `${item.roleId}`,],
			].map(([label, value], i) => (
				<InfoBox key={i} label={label}>
					<div className="value"> {value} </div>
				</InfoBox>
			))}
		</div>
	);
};

export const ViewUser = styled(ViewUserContainer)`
	display: flex;
	flex-direction: column;
	gap: 13px;

	& .group {
		box-sizing: border-box;
		border: 1px solid #ddd;
		padding: 3px 6px;
	}

	& .value {
		text-align: left;
		padding: 6px 9px;
	}
`;
