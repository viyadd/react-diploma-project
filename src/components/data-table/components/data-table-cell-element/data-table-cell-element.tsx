import styled from 'styled-components';
import { AppComponentsPropsBase, DataTableHeaderWithTools } from '../../../../types';
import { get } from 'lodash';
import { /* DateFormat,  */ formatDate } from '../../../../utils';
import { Link } from 'react-router-dom';
import { IconButton } from '../../../icon-button/icon-button';

interface DataTableCellElementProps extends AppComponentsPropsBase {
	item: unknown;
	header: DataTableHeaderWithTools;
}

const DataTableCellElementContainer = ({
	className,
	item,
	header,
}: DataTableCellElementProps) => {
	const getValue = (obj: unknown, path: string) => {
		const value = get(obj, path);
		const type = header.type;
		const cellValue =
			type !== undefined && typeof value === 'string' ? formatDate(value, type) : value;

		return cellValue !== undefined ? cellValue : '-';
	};

	const getElementType = (h: DataTableHeaderWithTools) => {
		if (h.tools !== undefined) {
			return (
				<div className="tools">
					{h.tools.map(({ key, iconId, tooltip, onClick }) => (
						<IconButton
							key={key}
							id={iconId}
							tooltip={tooltip}
							onClick={() => onClick({ value: item, key })}
						/>
					))}
				</div>
			);
		}
		if (h.link !== undefined) {
			return (
				<Link className="link" to={h.link(item)}>
					{getValue(item, header.key)}
				</Link>
			);
		}
		if (h.link === undefined) {
			return <div>{getValue(item, header.key)}</div>;
		}
	};

	return <div className={className}>{getElementType(header)}</div>;
};

export const DataTableCellElement = styled(DataTableCellElementContainer)`
	width: auto;
	border-bottom: 1px solid #eee;

	& .link {
		text-decoration-line: none;
	}

	& .tools {
		display: flex;
		width: auto;
	}
`;
