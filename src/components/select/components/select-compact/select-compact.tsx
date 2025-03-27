import styled from 'styled-components';
import { forwardRef } from 'react';
import { SkeletonLoader } from '@/components/skeleton-loader/skeleton-loader';
import { SelectProps } from '../../select';

const SelectCompactContainer = forwardRef(
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

export const SelectCompact = styled(SelectCompactContainer)`
	position: relative;
	display: inline-flexbox;
	box-sizing: border-box;
	width: ${({ width = '100%' }) => width};
	height: 100%;
	margin: 0 0 10px;

	& select {
		box-sizing: border-box;
		padding: 3px;
		padding-right: 9px;
		width: 100%;
		color: #213547;
		border: none;
		font-size: 14px;
		background-color: #fff;
		border-bottom: 1px solid #eebf7c;
	}

	& option {
		box-sizing: border-box;
		font-size: 14px;
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
		outline: none;
		border-bottom: 1px solid #196cd8;
	}
	& select:focus ~ .label {
		color: #196cd8;
	}
`;
