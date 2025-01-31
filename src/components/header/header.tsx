import styled from 'styled-components';
import { Toolbar } from './components/indedx';
import { Link } from 'react-router-dom';
import { RoutePathKeyList, useCurrentRoute } from '../../hooks';

const pageList: { key: RoutePathKeyList; title: string; path: string }[] = [
	{ key: 'main', title: 'Главная', path: '/' },
	{ key: 'projects', title: 'Проекты', path: '/projects' },
	{ key: 'analytics', title: 'Аналитика', path: '/analytics' },
	{ key: 'users', title: 'Пользователи', path: '/users' },
];

const HeaderContainer = ({ className }: { className?: string }) => {
	const keyObj: Record<RoutePathKeyList, string> = Object.fromEntries(
		pageList.map(({ key, path }) => [key, path]),
	) as Record<RoutePathKeyList, string>;

	const currentRoute = useCurrentRoute(keyObj);
	const isActive = (key: RoutePathKeyList) => (currentRoute.isActive(key) ? ' active' : '');

	return (
		<div className={className}>
			<div className="link-list">
				{pageList.map(({ key, title, path }) => (
					<Link key={key} className={`link${isActive(key)}`} to={path}>
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

	& .link-list {
		display: flex;
		background-color: #eee;
		padding: 20px 9px;
	}

	& .link {
		text-decoration: none;
		font-size: 19px;
		padding-right: 9px;
		color: #213547;
		border-bottom : 1px solid transparent;
		transition: border-bottom 150ms;
	}

	& .active {
		border-bottom : 1px solid #EEBF7C;
		transition: border-bottom 150ms;
	}

	& .toolbar {
		margin: 14px 9px;
		width: 100%;
	}
`;
