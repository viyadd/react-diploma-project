import styled from 'styled-components';
import { AppComponentsProps } from '../../../../shared/interfaces';

export interface UsersTableRow extends AppComponentsProps {
	border?: boolean
}

const TableRowContainer = ({ className, children }: UsersTableRow) => (
  <div className={className}>{children}</div>
);

export const TableRow = styled(TableRowContainer)`
  display: flex;
  align-items: center;
  border: ${({ border }) => (border ? '1px solid #EEBF7C' : 'none')};
	padding: 6px;

  & > div {
    display: flex;
    padding: 0 10px;
  }

  & .login-column {
    width: 172px;
  }
  & .registred-at-column {
    width: 213px;
  }
  & .role-column {
    width: auto;
  }
`;
