import styled from 'styled-components';
import { forwardRef } from 'react';
import { AppComponentsOptionsProps } from '../../types';
import { SkeletonLoader } from '../skeleton-loader/skeleton-loader';

interface OptionListData {
	key: string;
	value: string;
	text?: string;
}

interface SelectProps extends AppComponentsOptionsProps {
	width?: string;
	value?: string | number | readonly string[];
	loading?: boolean;
	disabled?: boolean;
	optionsList: OptionListData[];
	defaultValue?: string | number | readonly string[];
	onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

const SelectContainer = forwardRef(
	(
		{ className, value, optionsList, loading, defaultValue, ...props }: SelectProps,
		ref: React.Ref<HTMLSelectElement>,
	) => {
		return (
			<div className={className}>
				<SkeletonLoader type="field" loading={loading} />
				{!loading && (
					<select value={value} defaultValue={defaultValue || ''} {...props} ref={ref}>
						<option value="" disabled hidden>
							Выбрать здесь
						</option>
						{optionsList.map(({ key, value: optionValue, text }) => (
							<option key={key} value={key}>
								{text || optionValue}
							</option>
						))}
					</select>
				)}
			</div>
		);
	},
);

export const Select = styled(SelectContainer)`
	display: inline-flexbox;
	box-sizing: border-box;
	width: ${({ width = '100%' }) => width};
	height: 100%;
	margin: 0 0 10px;
	padding: 10px;
	border: 1px solid #eebf7c;

	& select {
		width: 100%;
		border: none;
		font-size: 18px;
		background-color: #fff;
	}

	& option {
		font-size: 13px;
	}
`;
