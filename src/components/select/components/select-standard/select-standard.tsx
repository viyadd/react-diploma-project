import styled from 'styled-components';
import { forwardRef } from 'react';
import { AppComponentsOptionsProps } from '@/types';
import { SkeletonLoader } from '@/components/skeleton-loader/skeleton-loader';

interface OptionListData {
	key: string;
	value: string;
	text?: string;
	mode?: 'compact';
}

interface SelectProps extends AppComponentsOptionsProps {
	placeholder?: string;
	label?: string;
	width?: string;
	value?: string | number | readonly string[];
	loading?: boolean;
	disabled?: boolean;
	optionsList: OptionListData[];
	defaultValue?: string | number | readonly string[];
	onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

const SelectStandardContainer = forwardRef(
	(
		{
			className,
			value,
			optionsList,
			loading,
			placeholder,
			label,
			defaultValue,
			...props
		}: SelectProps,
		ref: React.Ref<HTMLSelectElement>,
	) => {
		return (
			<div className={className}>
				<SkeletonLoader type="field" loading={loading} />
				{!loading && (
					<>
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
						{(label || placeholder) && (
							<div className="label">{label || placeholder}</div>
						)}
					</>
				)}
			</div>
		);
	},
);

export const SelectStandard = styled(SelectStandardContainer)`
	position: relative;
	display: inline-flexbox;
	box-sizing: border-box;
	width: ${({ width = '100%' }) => width};
	height: 100%;
	margin: 0 0 10px;

	& select {
		box-sizing: border-box;
		padding: 10px;
		padding-right: 15px;
		width: 100%;
		border: none;
		font-size: 18px;
		background-color: #fff;
		border: 1px solid #eebf7c;
	}

	& option {
		box-sizing: border-box;
		font-size: 13px;
	}

	& .label {
		font-size: 13px;
		position: absolute;
		padding: 0 3px;
		background-color: #fff;
		color: #eebf7c;
		top: -11px;
		left: 9px;
		z-index: 2;
	}
	& select:focus {
		outline: 1px solid #196cd8;
		border: 1px solid #196cd8;
	}
	& select:focus ~ .label {
		color: #196cd8;
	}
`;
