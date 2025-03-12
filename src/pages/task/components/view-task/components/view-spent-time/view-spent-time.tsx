import { InfoBox } from '@/components';
import { AppComponentsPropsBase, DataBaseSpentTimeData } from '@/types';
import { formatDate } from '@/utils';
import styled from 'styled-components';

interface ViewSpentTimeInfoProps extends AppComponentsPropsBase {
	item: DataBaseSpentTimeData | null;
}

const ViewSpentTimeInfoContainer = ({ className, item }: ViewSpentTimeInfoProps) => {
	const getFullName = ({ executor }: DataBaseSpentTimeData) => {
		const { surname, name, patronymic } = executor ?? {};
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
				['Исполнитель', getFullName(item)],
				['Коментарий', item.comment],
				['Время начала', formatDate(item.startedAt, 'datetime')],
				['Продолжительность', `${item.duration}`,],
			].map(([label, value], i) => (
				<InfoBox key={i} label={label}>
					<div className="value"> {value} </div>
				</InfoBox>
			))}
		</div>
	);
};

export const ViewSpentTimeInfo = styled(ViewSpentTimeInfoContainer)`
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
