import styled from 'styled-components';
import { AppComponentsPropsBase, DataBaseTaskData } from '../../../../../../../../types';
import { get } from 'lodash';
import { DateFormat, formatDate } from '../../../../../../../../utils';

interface TaskRowProps extends AppComponentsPropsBase {
	item: DataBaseTaskData;
	valuePath: string;
	type?: DateFormat;
	// rows: Record<T,>[]
}

const TaskColumnContainer = ({ className, item, valuePath, type }: TaskRowProps) => {
	const getValue = (obj: unknown, path: string) => {
		const value = get(obj, path);
		return type !== undefined && typeof value === 'string'
			? formatDate(value, type)
			: value;
	};

	return <div className={className}>{<div>{getValue(item, valuePath) || '-'}</div>}</div>;
};

export const TaskColumn = styled(TaskColumnContainer)``;
