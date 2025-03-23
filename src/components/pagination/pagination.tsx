import styled from 'styled-components';
import { AppComponentsPropsBase } from '../../types';
import { IconButton } from '../icon-button/icon-button';

interface PaginationProps extends AppComponentsPropsBase {
	page: number | null;
	lastPage: number | null;
	width?: string;
	setPage: (page: number) => void;
}
const PaginationContainer = ({ className, page, lastPage, setPage }: PaginationProps) => {
	if (lastPage === null || page === null) {
		return;
	}

	return (
		<div className={className}>
			<IconButton
				disabled={page === 1}
				id="fa-angle-double-left"
				tooltip="В начало"
				onClick={() => setPage(1)}
			/>
			<IconButton
				disabled={page === 1}
				id="fa-angle-left"
				tooltip="Предыдущая"
				onClick={() => setPage(page - 1)}
			/>

			<div className="current-page">{page}</div>
			<IconButton
				disabled={page === lastPage}
				id="fa-angle-right"
				tooltip="Следующая"
				onClick={() => setPage(page + 1)}
			/>
			<IconButton
				disabled={page === lastPage}
				id="fa-angle-double-right"
				tooltip="В конец"
				onClick={() => setPage(lastPage)}
			/>
		</div>
	);
};

export const Pagination = styled(PaginationContainer)`
	display: flex;
	justify-content: end;
	width: ${({ width = '100%' }) => width};
	margin: 10px 0 0;
	padding: 0 35px;

	& button {
		margin: 0 5px;
	}

	& .current-page {
		width: auto;
		min-width: 20px;
		height: 32px;
		margin: 0 5px;
		font-size: 18px;
		font-weight: 500;
		line-height: 26px;
		text-align: center;
		/* border: 1px solid #000; */
	}
`;
