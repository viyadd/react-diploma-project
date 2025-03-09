import styled from 'styled-components';
import { AppComponentsProps } from '../../../../types';

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

  & .title-column {
    width: 172px;
  }
  & .created-at-column {
    width: 213px;
  }
  & .state-column {
		width: 100px;
	}
	& .description-column {
		width: 250px;
	}
`;
