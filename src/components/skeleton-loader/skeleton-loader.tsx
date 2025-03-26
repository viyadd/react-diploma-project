import styled from 'styled-components';
import { AppComponentsPropsBase } from '../../types';
import { Article, Field, SkeletonLoaderTableBbody, SkeletonLoaderTableHeader } from './components';

interface SkeletonLoaderProps extends AppComponentsPropsBase {
	loading?: boolean;
	type?: 'table-tbody' |'table-header' |  'article' | 'field';
	width?: string;
	rows?: number;
}

const SkeletonLoaderContainer = ({
	className,
	type,
	loading,
	...props
}: SkeletonLoaderProps) => {
	return (
		<div className={className}>
			{type === undefined && <span className="loader"></span>}
			{type === 'table-tbody' && (
				<SkeletonLoaderTableBbody loading={loading} {...props} />
			)}
			{type === 'table-header' && (
				<SkeletonLoaderTableHeader loading={loading} {...props} />
			)}
			{type === 'article' && <Article loading={loading} />}
			{type === 'field' && <Field loading={loading} />}
		</div>
	);
};

export const SkeletonLoader = styled(SkeletonLoaderContainer)``;
