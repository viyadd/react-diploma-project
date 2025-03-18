import { forwardRef } from 'react';
import styled from 'styled-components';
import { AppComponentsPropsBase } from '../../types';

interface InputProps extends AppComponentsPropsBase {
	width?: string;
	type?: string;
	disabled?: boolean;
	placeholder?: string;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
	defaultValue?: string | number | readonly string[];
}

const InputContainer = forwardRef(
	(
		{ className, defaultValue, ...props }: InputProps,
		ref: React.Ref<HTMLInputElement>,
	) => {
		return (
			<input className={className} defaultValue={defaultValue} {...props} ref={ref} />
		);
	},
);

export const Input = styled(InputContainer)`
	box-sizing: border-box;
	width: ${({ width = '100%' }) => width};
	height: 100%;
	margin: 0 0 10px;
	padding: 10px;
	font-size: 18px;
	border: 1px solid #eebf7c;
`;
