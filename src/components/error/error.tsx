import styled from 'styled-components';
import { PageTitle } from '../page-title/page-title';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
`;

interface ErrorProps {
	error: string
}

export const Error = ({ error }: ErrorProps) =>
  error && (
    <Div>
      <PageTitle>Ошибка</PageTitle>
      <div>{error}</div>
    </Div>
  );
