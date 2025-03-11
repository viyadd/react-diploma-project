import styled from 'styled-components';
import { AppComponentsPropsBase } from '../../types';
import { Article, SkeletonLoaderTableBbody } from './components';

interface SkeletonLoaderProps extends AppComponentsPropsBase {
	loading?: boolean;
	type?: 'table-tbody'|'article';
}

const SkeletonLoaderContainer = ({ className, type, loading }: SkeletonLoaderProps) => {
	return (
		<div className={className}>
			{type === undefined && <span className="loader"></span>}
			{type === 'table-tbody' && <SkeletonLoaderTableBbody loading={loading} />}
			{type === 'article' && <Article loading={loading} />}
		</div>
	);
};

export const SkeletonLoader = styled(SkeletonLoaderContainer)``;
