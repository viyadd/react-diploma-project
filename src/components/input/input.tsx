import { forwardRef } from 'react';
import styled from 'styled-components';
import { AppComponentsPropsBase } from '../../types';

interface InputProps extends AppComponentsPropsBase {
	width?: string;
	type?: string;
	disabled?: boolean;
	placeholder?: string;
	label?: string;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
	defaultValue?: string | number | readonly string[];
}

const InputContainer = forwardRef(
	(
		{ className, defaultValue, placeholder, label, ...props }: InputProps,
		ref: React.Ref<HTMLInputElement>,
	) => {
		return (
			<div className={className}>
				<input
					defaultValue={defaultValue}
					placeholder={placeholder}
					{...props}
					ref={ref}
				/>
				{(label || placeholder) && <div className="label">{label || placeholder}</div>}
			</div>
		);
	},
);

export const Input = styled(InputContainer)`
	position: relative;
	width: ${({ width = '100%' }) => width};
	height: 100%;
	border: 1px solid #eebf7c;
	margin-bottom: 16px;

	& input {
		box-sizing: border-box;
		margin: 0;
		padding: 10px;
		width: 100%;
		border: none;
		font-size: 18px;
	}

	& .label {
		font-size: 13px;
		position: absolute;
		padding: 0 3px;
		background-color: #fff;
		color: #eebf7c;
		top: -11px;
		left: 9px;
	}
	& input:focus {
		outline: 1px solid #196cd8;
	}
	& input:focus ~ .label {
		color: #196cd8;
	}
`;
