import { forwardRef } from 'react';
import styled from 'styled-components';
import { ComponentsProps } from '../../shared/interfaces';

interface InputProps extends ComponentsProps {
	width?: string;
	type?: string;
	placeholder?: string;
}

const InputContainer = forwardRef(
	({ className, ...props }: InputProps, ref: React.Ref<HTMLInputElement>) => {
		return <input className={className} {...props} ref={ref} />;
	},
);

export const Input = styled(InputContainer)`
	width: ${({ width = '100%' }) => width};
	height: 20px;
	margin: 0 0 10px;
	padding: 10px;
	font-size: 18px;
	border: 1px solid #000;
`;
