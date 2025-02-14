import styled from "styled-components";
import { AppComponentsProps } from "../../shared/interfaces";

interface ButtonProps extends AppComponentsProps{
	width?: string
	disabled?: boolean
	type?: "button" | "submit" | "reset" | undefined
	onClick?: React.MouseEventHandler<HTMLButtonElement>
}
const ButtonContainer= ({className, children, ...props }: ButtonProps) => {
	return (
		<button className={className} {...props}>
      {children}
    </button>
	)
}

export const Button = styled(ButtonContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  width: ${({ width = '100%' }) => width};
  height: 32px;
	margin: 11px;
	/* border: none; */
  border: 1px solid #ccc;
  background-color: #eee;

  &:hover {
    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  }
`;
