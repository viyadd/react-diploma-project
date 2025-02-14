import styled from 'styled-components';
import { AppComponentsOptionsProps } from '../../shared/interfaces';
import { forwardRef } from 'react';

interface OptionListData {
	key: string;
	value: string;
	text?: string;
}

interface SelectProps extends AppComponentsOptionsProps {
	width?: string;
	value?: string;
	optionsList: OptionListData[];
	onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

const SelectContainer = forwardRef(
	(
		{ className, value, optionsList, ...props }: SelectProps,
		ref: React.Ref<HTMLSelectElement>,
	) => {
		return (
			<div className={className}>
				<select value={value} {...props} ref={ref}>
					{optionsList.map(({ key, value: optionValue, text }) => (
						<option key={key} value={key}>
							{text || optionValue}
						</option>
					))}
				</select>
			</div>
		);
	},
);

export const Select = styled(SelectContainer)`
	display: inline-flexbox;
	width: ${({ width = '100%' }) => width};
	height: 20px;
	margin: 0 0 10px;
	padding: 10px;
	border: 1px solid #eebf7c;

	& select {
		width: 100%;
		border: none;
		font-size: 18px;
		background-color: #fff;
	}
`;
