import { forwardRef } from 'react';
import { AppComponentsOptionsProps } from '../../types';
import { SelectCompact, SelectStandard } from './components';

interface OptionListData {
	key: string;
	value: string;
	text?: string;
}

export interface SelectProps extends AppComponentsOptionsProps {
	mode?: 'compact';

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

export const Select = forwardRef(
	(
		{
			mode,
			optionsList,
			...props
		}: SelectProps,
		ref: React.Ref<HTMLSelectElement>,
	) => {
		return (
			<>
			{mode === undefined && <SelectStandard optionsList={optionsList} {...props} ref={ref}/>}
			{mode !== undefined && <SelectCompact optionsList={optionsList} {...props} ref={ref}/>}
			</>
		);
	},
);

// export const Select = styled(SelectContainer)`
// 	position: relative;
// 	display: inline-flexbox;
// 	box-sizing: border-box;
// 	width: ${({ width = '100%' }) => width};
// 	height: 100%;
// 	margin: 0 0 10px;

// 	& select {
// 		box-sizing: border-box;
// 		padding: 10px;
// 		padding-right: 15px;
// 		width: 100%;
// 		border: none;
// 		font-size: 18px;
// 		background-color: #fff;
// 		border: 1px solid #eebf7c;
// 	}

// 	& option {
// 		box-sizing: border-box;
// 		font-size: 13px;
// 	}

// 	& .label {
// 		font-size: 13px;
// 		position: absolute;
// 		padding: 0 3px;
// 		background-color: #fff;
// 		color: #eebf7c;
// 		top: -11px;
// 		left: 9px;
// 		z-index: 2;
// 	}
// 	& select:focus {
// 		outline: 1px solid #196cd8;
// 		border: 1px solid #196cd8;
// 	}
// 	& select:focus ~ .label {
// 		color: #196cd8;
// 	}
// `;
