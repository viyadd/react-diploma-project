import styled from 'styled-components';
import { Header } from './components';
import { Route, Routes } from 'react-router';

const Page = styled.div``;
function App() {
	return (
		<div>
			<Header />
			<Page>
				<Routes>
					<Route path="/" element={<div>Главная</div> } />
					<Route path="/login" element={<div>Вход</div>} />
					<Route path="/register" element={<div>Регистрация</div>} />
					<Route path="/analytics" element={<div>Аналитика</div>} />
					<Route path="/users" element={<div>Пользователи</div>} />
					<Route path="/projects" element={<div>Проекты</div>} />
					<Route path="/project/:id" element={<div>Проект</div>} />
					<Route path="*" element={<div>Ошибка</div>} />
				</Routes>
			</Page>
		</div>
	);
}

export default App;
