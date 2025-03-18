import styled from 'styled-components';
import { Toolbar } from './components/indedx';
import { Link } from 'react-router-dom';
import { RoutePathKeyList, useCurrentRoute } from '@/hooks';
import { useAppDispatch } from '@/hooks/use-app-store';
import { setToolbarOptionList } from '@/actions';

const pageList: { key: RoutePathKeyList; title: string; path: string }[] = [
	{ key: 'main', title: 'Главная', path: '/' },
	{ key: 'projects', title: 'Проекты', path: '/projects' },
	{ key: 'analytics', title: 'Аналитика', path: '/analytics' },
	{ key: 'users', title: 'Пользователи', path: '/users' },
];

const HeaderContainer = ({ className }: { className?: string }) => {
	const dispatch = useAppDispatch();

	const keyObj: Record<RoutePathKeyList, string> = Object.fromEntries(
		pageList.map(({ key, path }) => [key, path]),
	) as Record<RoutePathKeyList, string>;

	const currentRoute = useCurrentRoute(keyObj);
	const isActive = (key: RoutePathKeyList) =>
		currentRoute.isActive(key) ? ' active' : '';

	return (
		<div className={className}>
			<div className="link-list">
				{pageList.map(({ key, title, path }) => (
					<Link
						key={key}
						className={`link${isActive(key)}`}
						to={path}
						onClick={() => dispatch(setToolbarOptionList([]))}
					>
						{title}
					</Link>
				))}
			</div>
			<div className="toolbar">
				<Toolbar />
			</div>
		</div>
	);
};

export const Header = styled(HeaderContainer)`
	display: flex;
	align-items: center;
	border-bottom: 1px solid #777777;
	align-items: stretch;
	height: 6vh;

	& .link-list {
		display: flex;
		background-color: #eee;
		gap: 6px;
		padding: 0 9px;
		align-items: center;
	}

	& .link {
		text-decoration: none;
		font-size: 19px;
		color: #213547;
		border-bottom: 1px solid transparent;
		transition: border-bottom 150ms;
	}

	& .active {
		border-bottom: 1px solid #eebf7c;
		transition: border-bottom 150ms;
	}

	& .toolbar {
		display: flex;
		/* justify-content: flex-end; */
		/* margin: 14px 9px; */
		align-items: center;
		width: 100%;
	}
`;
