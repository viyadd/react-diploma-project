import styled from 'styled-components';
import { Toolbar } from './components/indedx';
import { Link } from 'react-router-dom';

const pageList = [
	{ key: 'main', title: 'Главная', path: '/' },
	{ key: 'projects', title: 'Проекты', path: '/projects' },
	{ key: 'analytics', title: 'Аналитика', path: '/analytics' },
	{ key: 'users', title: 'Пользователи', path: '/users' },
];

const HeaderContainer = ({ className }: { className?: string }) => {
	return (
		<div className={className}>
			<div className="link-list">
				{pageList.map(({ key, title, path }) => (
					<Link key={key} className="link" to={path}>
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
	}

	& .toolbar {
		margin: 14px 9px;
		width: 100%;
	}
`;
